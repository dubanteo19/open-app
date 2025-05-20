import { Client, IMessage, StompSubscription } from "@stomp/stompjs";

let socketClient: Client | null = null;

export const getSocketClient = (): Client | null => {
  if (socketClient) return socketClient;

  const token = localStorage.getItem("accessToken");
  if (!token) {
    console.error("No access token found");
    return null;
  }

  socketClient = new Client({
    brokerURL: `ws://localhost:8080/ws?access_token=${encodeURIComponent(token)}`,
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
