import ReactDOM from "react-dom/client";
import { App } from "./components/App";

export const mount: MountFn = (el, params) => {
  if (!el) {
    return {
      onParentNavigate() {},
      unmount() {},
    };
  }

  const root = ReactDOM.createRoot(el);
  root.render(<App />);

  return {
    onParentNavigate() {},
    unmount() {
      if (el) {
        root.unmount();
      }
    },
  };
};
