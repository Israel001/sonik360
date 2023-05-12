import AOS from "aos";
import "aos/dist/aos.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ContextProvider } from "./context/appcontext";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

AOS.init();

const root = document.getElementById("root");
ReactDOM.createRoot(root as any).render(
  <BrowserRouter>
    <ContextProvider>
      <App />
    </ContextProvider>
  </BrowserRouter>,
);
