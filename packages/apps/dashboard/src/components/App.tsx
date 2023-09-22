import { MemoryHistory, createBrowserHistory } from "history";
import { Router, Switch, useHistory, Route } from "react-router-dom";
import { Button } from "shared/Components";
import { Details } from "./Details";
import { Archive } from "./Archive";

function Home() {
  const history = useHistory();

  return (
    <div>
      <div>Dashboard app! (React 17) - RELOAD</div>
      <span>
        <Button onClick={() => history.push("/dashboard/details")}>
          Go to details
        </Button>
        <Button onClick={() => history.push("/dashboard/archive")}>
          Go to archive
        </Button>
      </span>
    </div>
  );
}

export function App(props: { history: MemoryHistory }) {
  return (
    <Router history={props.history}>
      <Switch>
        <Route exact path={"/dashboard/details"}>
          <Details />
        </Route>
        <Route exact path={"/dashboard/archive"}>
          <Archive />
        </Route>
        <Route exact path={"/dashboard"}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
