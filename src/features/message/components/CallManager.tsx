import { Dialog } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { useStomp } from "@/hooks/useStomp";
import { IMessage } from "@stomp/stompjs";
import { useCallback, useEffect, useRef } from "react";
import { CallSession } from "../call/CallSession";
import { useWebRTC } from "../call/hook";
import { IncomingCall } from "../call/IncomingCall";
import { setCallState, setRemoteUsername, setSdp } from "../call/slice";
import { SignalMessage } from "../type/callSignalMessage";

export const CallManager = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { callState, remoteUsername, sdp } = useAppSelector(
    (state) => state.call,
  );
  const dispatch = useAppDispatch();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { connected, subscribeToTopic, stompClient } = useStomp();
  const { handleIce, handleAnswer, acceptCall, startCall, endCall } = useWebRTC(
    {
      onCallStateChange: (state) => dispatch(setCallState(state)),
      remoteVideoRef,
      localVideoRef,
      onRemoteUsernameChange: (username) =>
        dispatch(setRemoteUsername(username)),
      stompClient: stompClient?.current,
    },
  );
  useEffect(() => {
    if (remoteUsername && callState === "calling" && user) {
      startCall(user.username, remoteUsername);
    }
  }, [remoteUsername, callState, user, startCall]);

  const onOffer = useCallback(
    (message: IMessage) => {
      const signal: SignalMessage = JSON.parse(message.body);
      if (user && signal.from) {
        dispatch(setRemoteUsername(signal.from));
        dispatch(setSdp(signal.sdp!));
        dispatch(setCallState("incoming"));
      }
    },
    [dispatch, user],
  );
  const onAnswer = useCallback(
    (message: IMessage) => {
      const signal: SignalMessage = JSON.parse(message.body);
      handleAnswer(signal.sdp!);
    },
    [handleAnswer],
  );
  const onIce = useCallback(
    (message: IMessage) => {
      const signal: SignalMessage = JSON.parse(message.body);
      handleIce(signal.candidate!);
    },
    [handleIce],
  );
  useEffect(() => {
    if (!connected) return;
    const unsubscribeOffer = subscribeToTopic(
      "/user/queue/call.offer",
      onOffer,
    );
    const unsubscribeAnswer = subscribeToTopic(
      "/user/queue/call.answer",
      onAnswer,
    );
    const unsubscribeIce = subscribeToTopic("/user/queue/call.ice", onIce);
    return () => {
      unsubscribeAnswer();
      unsubscribeOffer();
      unsubscribeIce();
    };
  }, [connected, subscribeToTopic, onAnswer, onOffer, onIce]);
  return (
    <Dialog open={callState != "idle"}>
      {callState == "incoming" && (
        <IncomingCall
          onAccept={() => {
            if (user && remoteUsername) {
              acceptCall(user?.username, remoteUsername, sdp!);
            }
          }}
          onReject={() => dispatch(setCallState("idle"))}
        />
      )}
      {(callState == "active" || callState == "calling") && (
        <CallSession
          onEndCall={endCall}
          localRef={localVideoRef}
          remoteRef={remoteVideoRef}
        />
      )}
    </Dialog>
  );
};
