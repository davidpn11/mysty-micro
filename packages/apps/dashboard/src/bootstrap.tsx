import ReactDOM from "react-dom";
import { App } from "./components/App";
import { createMemoryHistory } from "history";

export const mount: MountFn = (el, params) => {
  const history = createMemoryHistory({
    initialEntries: [params.initialPath],
  });

  const listener = (location: unknown) => {
    console.log("Mount Dashboard - onNavigate", location);
    params.onNavigate(location);
  };

  history.listen(listener);
  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      if (history.location.pathname !== nextPathname) {
        console.log({ "Mount Dashboar - onParentnavigate": nextPathname });
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
