import { Dialog } from "@/components/ui/dialog";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import {
  activateSocketClient,
  deactivateSocketClient,
  getSocketClient,
  subscribeWhenConnected,
} from "@/shared/websocket";
import { IMessage } from "@stomp/stompjs";
import { useCallback, useEffect, useRef } from "react";
import { CallSession } from "../call/CallSession";
import { useWebRTC } from "../call/hook";
import { IncomingCall } from "../call/IncomingCall";
import { setCallState, setRemoteUsername, setSdp } from "../call/slice";
import { SignalMessage } from "../type/callSignalMessage";

export const CallManager = () => {
  console.log("mount the dam manager");
  const { callState, remoteUsername, sdp } = useAppSelector(
    (state) => state.call,
  );
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const { handleIce, handleAsnwer, acceptCall, startCall, endCall } = useWebRTC(
    {
      onCallStateChange: (state) => dispatch(setCallState(state)),
      remoteVideoRef,
      localVideoRef,
      onRemoteUsernameChange: (username) =>
        dispatch(setRemoteUsername(username)),
    },
  );
  useEffect(() => {
    if (remoteUsername && callState == "calling") {
      startCall(user?.username, remoteUsername);
    }
  });
  const onOffer = useCallback(
    (message: IMessage) => {
      const signal: SignalMessage = JSON.parse(message.body);
      console.log(signal);
      dispatch(setCallState("incoming"));
      dispatch(setRemoteUsername(signal.from));
      dispatch(setSdp(signal.sdp!));
    },
    [dispatch],
  );
  const onAnswer = useCallback(
    (message: IMessage) => {
      const signal: SignalMessage = JSON.parse(message.body);
      handleAsnwer(signal.sdp!);
    },
    [handleAsnwer],
  );
  const onIce = useCallback(
    (message: IMessage) => {
      const signal: SignalMessage = JSON.parse(message.body);
      handleIce(signal.candidate!);
    },
    [handleIce],
  );
  useEffect(() => {
    const client = getSocketClient();
    if (!client) return;
    const unsubscribeOffer = subscribeWhenConnected(
      client,
      "/user/queue/call.offer",
      onOffer,
    );
    const unsubscribeAnswer = subscribeWhenConnected(
      client,
      "/user/queue/call.answer",
      onAnswer,
    );
    const unsubscribeIce = subscribeWhenConnected(
      client,
      "/user/queue/call.ice",
      onIce,
    );
    activateSocketClient();
    return () => {
      unsubscribeAnswer(), unsubscribeOffer();
      unsubscribeIce();
      deactivateSocketClient();
    };
  }, []);
  return (
    <div>
      <Dialog open={true}>
        {callState == "incoming" && (
          <IncomingCall
            onAccept={() => {
              acceptCall(user?.username, remoteUsername, sdp!);
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
    </div>
  );
};
