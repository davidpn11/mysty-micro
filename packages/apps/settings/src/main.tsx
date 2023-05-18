import ReactDOM from "react-dom/client";
import { App } from "./components/App";

const el = document.getElementById("settings-mf");
if (el) {
  const root = ReactDOM.createRoot(el);
  root.render(<App />);
}
