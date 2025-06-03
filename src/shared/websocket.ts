import { SignalMessage } from "@/features/message/type/callSignalMessage";
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import { IP } from "./baseQuery";

let socketClient: Client | null = null;

export const getSocketClient = (): Client | null => {
  if (socketClient) return socketClient;

  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("No access token found");
    return null;
  }

  socketClient = new Client({
    brokerURL: `ws://${IP}/ws?token=${token}`,
    connectHeaders: { Authorization: `Bearer ${token}` },
    reconnectDelay: 10000,
    debug: (str) => console.log(str),
  });

  socketClient.onStompError = (frame) => {
    console.error("STOMP error:", frame);
  };
  return socketClient;
};

export const subscribeWhenConnected = (
  client: Client,
  topic: string,
  messageHandler: (message: IMessage) => void,
): (() => void) => {
  let subscription: StompSubscription | undefined;
  const subscribe = () => {
    subscription = client.subscribe(topic, messageHandler);
  };
  if (client.connected) {
    subscribe();
  } else {
    const prevOnConect = client.onConnect;
    client.onConnect = (frame) => {
      subscribe();
      if (prevOnConect) prevOnConect(frame);
    };
  }
  return () => {
    if (subscription) {
      subscription.unsubscribe();
    }
  };
};
export const activateSocketClient = () => {
  const client = getSocketClient();
  if (client && !client.active) {
    client.activate();
  }
};

export const deactivateSocketClient = () => {
  if (socketClient && socketClient.active) {
    socketClient.deactivate();
  }
};

export const sendSignal = (destination: string, payload: SignalMessage) => {
  const client = getSocketClient();
  if (client?.connected) {
    client.publish({ destination, body: JSON.stringify(payload) });
  } else {
    console.log("Not connected");
  }
};
