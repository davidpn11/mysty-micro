import ReactDOM from "react-dom";
import { App } from "./components/App";

export const mount = (el: Element | null) => {
  ReactDOM.render(<App />, el);

  return {
    unmount() {
      if (el) {
        ReactDOM.unmountComponentAtNode(el);
      }
    },
  };
};
