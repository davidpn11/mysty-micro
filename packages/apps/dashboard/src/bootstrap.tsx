import ReactDOM from "react-dom";
import { App } from "./components/App";
import { createMemoryHistory } from "history";

export const mount: MountFn = (el, params) => {
  const history = createMemoryHistory({
    initialEntries: [params.initialPath],
  });

  history.listen(params.onNavigate);
  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      if (history.location.pathname !== nextPathname) {
        console.log({ onParentNavigateDashboard: nextPathname });
        history.push(nextPathname);
      }
    },
    unmount() {
      if (el) {
        ReactDOM.unmountComponentAtNode(el);
      }
    },
  };
};
