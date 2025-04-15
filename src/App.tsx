import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from "./shared/store";
import { Toaster } from "sonner";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppRoutes />
      </Router>
      <Toaster richColors />
    </Provider>
  );
}

export default App;
