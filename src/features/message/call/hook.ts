import { RefObject, useCallback, useRef } from "react";
import { CallState } from "./slice";
import { Client } from "@stomp/stompjs";

interface UseWebRTCParams {
  localVideoRef: RefObject<HTMLVideoElement>;
  remoteVideoRef: RefObject<HTMLVideoElement>;
  onCallStateChange: (state: CallState) => void;
  onRemoteUsernameChange: (username: string) => void;
  stompClient: Client | null;
}
export const useWebRTC = ({
  localVideoRef,
  remoteVideoRef,
  onRemoteUsernameChange,
  onCallStateChange,
  stompClient,
}: UseWebRTCParams) => {
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const startCall = useCallback(
    async (from: string, to: string) => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      const config: RTCConfiguration = {
        iceServers: [
          {
            urls: ["turns:turn.dbt19.store:5349?transport=tcp"],
            username: "dbt19",
            credential: "123456",
          },
        ],
      };
      const pc = new RTCPeerConnection(config);
      peerRef.current = pc;
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      peerRef.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          const remoteStream = event.streams[0];
          remoteVideoRef.current.srcObject = remoteStream;
        }
      };
      pc.onicecandidate = (event) => {
        if (event.candidate && stompClient?.connected) {
          const destination = "/app/call.ice";
          const body = {
            to,
            from,
            candidate: event.candidate,
            signalType: "ICE",
          };
          console.log("Sending ICE candidate:", event.candidate);
          stompClient.publish({ destination, body: JSON.stringify(body) });
        }
      };
      const offer = await pc.createOffer();
      const body = {
        to,
        from,
        sdp: offer.sdp,
        signalType: "OFFER",
      };
      await pc.setLocalDescription(offer);
      stompClient?.publish({
        destination: "/app/call.offer",
        body: JSON.stringify(body),
      });
      onRemoteUsernameChange(to);
    },
    [localVideoRef, remoteVideoRef, onRemoteUsernameChange, stompClient],
  );
  const acceptCall = useCallback(
    async (from: string, to: string, sdp: string) => {
      onCallStateChange("active");
      const config: RTCConfiguration = {
        iceServers: [
          {
            urls: ["turns:turn.dbt19.store:5349?transport=tcp"],
            username: "dbt19",
            credential: "123456",
          },
        ],
      };
      const pc = new RTCPeerConnection(config);
      peerRef.current = pc;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      peerRef.current.ontrack = (event) => {
        if (remoteVideoRef.current) {
          const remoteStream = event.streams[0];
          remoteVideoRef.current.srcObject = remoteStream;
        }
      };
      pc.onicecandidate = (event) => {
        if (event.candidate && stompClient?.connected) {
          const destination = "/app/call.ice";
          const body = {
            from,
            to,
            candidate: event.candidate,
            signalType: "ICE",
          };
          console.log("Sending ICE candidate:", event.candidate);
          stompClient.publish({ destination, body: JSON.stringify(body) });
        }
      };
      await pc.setRemoteDescription(
        new RTCSessionDescription({ type: "offer", sdp }),
      );
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      const body = {
        from,
        to,
        sdp: answer.sdp,
        signalType: "ASNWER",
      };
      stompClient?.publish({
        destination: "/app/call.answer",
        body: JSON.stringify(body),
      });
    },
    [localVideoRef, remoteVideoRef, onCallStateChange, stompClient],
  );

  const handleAnswer = useCallback(
    async (sdp: string) => {
      const pc = peerRef.current;
      if (!pc) return;
      await pc.setRemoteDescription(
        new RTCSessionDescription({ type: "answer", sdp }),
      );
      onCallStateChange("active");
    },
    [onCallStateChange],
  );

  const handleIce = useCallback(async (candidate: RTCIceCandidate) => {
    const pc = peerRef.current;
    console.log("Received ICE candidate:", JSON.stringify(candidate));
    if (!pc) return;
    pc.addIceCandidate(candidate);
  }, []);
  const endCall = useCallback(() => {
    peerRef.current?.close();
    peerRef.current = null;
    const localStream = localVideoRef.current?.srcObject as MediaStream;
    localStream?.getTracks().forEach((track) => track.stop());
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
    onCallStateChange("idle");
  }, [onCallStateChange, localVideoRef, remoteVideoRef]);
  return { startCall, acceptCall, handleAnswer, handleIce, endCall };
};
