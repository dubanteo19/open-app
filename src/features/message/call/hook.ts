import { sendSignal } from "@/shared/websocket";
import { RefObject, useCallback, useRef } from "react";
import { CallState } from "./slice";

interface UseWebRTCParams {
  localVideoRef: RefObject<HTMLVideoElement>;
  remoteVideoRef: RefObject<HTMLVideoElement>;
  onCallStateChange: (state: CallState) => void;
  onRemoteUsernameChange: (username: string) => void;
}
export const useWebRTC = ({
  localVideoRef,
  remoteVideoRef,
  onRemoteUsernameChange,
  onCallStateChange,
}: UseWebRTCParams) => {
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const startCall = useCallback(
    async (from: string, to: string) => {
      const config: RTCConfiguration = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      };
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      const pc = new RTCPeerConnection(config);
      peerRef.current = pc;
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      pc.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          sendSignal("/app/call.ice", {
            to,
            from,
            candidate: event.candidate,
            signalType: "ICE",
          });
        }
      };
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      sendSignal("/app/call.offer", {
        to,
        from,
        sdp: offer.sdp,
        signalType: "OFFER",
      });
      onRemoteUsernameChange(to);
    },
    [localVideoRef, remoteVideoRef, onRemoteUsernameChange],
  );
  const acceptCall = useCallback(
    async (from: string, to: string, sdp: string) => {
      onCallStateChange("active");
      const config: RTCConfiguration = {
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      };
      const pc = new RTCPeerConnection(config);
      peerRef.current = pc;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("set local ref");
      if (localVideoRef.current) {
        console.log("set local ref ok");
        localVideoRef.current.srcObject = stream;
      }
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));
      pc.ontrack = (event) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
      pc.onicecandidate = (event) => {
        if (event.candidate) {
          sendSignal("/app/call.ice", {
            from,
            to,
            candidate: event.candidate,
            signalType: "ICE",
          });
        }
      };
      await pc.setRemoteDescription(
        new RTCSessionDescription({ type: "offer", sdp }),
      );
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      sendSignal("/app/call.answer", {
        from,
        to,
        sdp: answer.sdp,
        signalType: "ASNWER",
      });
    },
    [localVideoRef, remoteVideoRef, onCallStateChange],
  );
  const handleAsnwer = useCallback(
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
    if (!pc) return;
    await pc.addIceCandidate(new RTCIceCandidate(candidate));
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
  return { startCall, acceptCall, handleAsnwer, handleIce, endCall };
};
