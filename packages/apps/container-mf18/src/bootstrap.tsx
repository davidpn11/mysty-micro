import ReactDOM from "react-dom/client";
import { App } from "./components/App";

const el = document.getElementById("mysty-mf18");
if (el) {
  const root = ReactDOM.createRoot(el);
  root.render(<App />);
}
