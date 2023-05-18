import ReactDOM from "react-dom/client";
import { App } from "./components/App";

export const mount = (el: Element | null) => {
  if (!el) {
    return null;
  }

  const root = ReactDOM.createRoot(el);
  root.render(<App />);

  return {
    unmount() {
      if (el) {
        root.unmount();
      }
    },
  };
};
