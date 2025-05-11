import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
import { store } from "./shared/store.ts";
import { persistor } from "./shared/store.ts";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { PersistGate } from "redux-persist/integration/react";
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={clientId}>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <Toaster richColors />
      </PersistGate>
    </Provider>
  </GoogleOAuthProvider>,
);
