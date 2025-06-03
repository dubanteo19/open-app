export interface SignalMessage {
  signalType: SignalType;
  sdp?: string;
  to: string;
  from?: string;
  candidate?: RTCIceCandidate;
}
export type SignalType = "OFFER" | "ASNWER" | "ICE";
