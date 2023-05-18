import { Wrapper } from "../../styles";
import styled, { createGlobalStyle } from "styled-components";
import { Item, PageHeader, Sidebar } from "shared/Components";
import { Suspense, lazy, useMemo, useState } from "react";
import { Route, Router, Switch } from "react-router-dom";

//@ts-ignore
import { createBrowserHistory } from "history";

const Dashboard = lazy(() => import("../../modules/dashboard"));
// const Dashboard = lazy(() => import("../../modules/dashboard"));
const Settings = lazy(() => import("../../modules/settings"));

const GlobalStylesheet = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  html, body {
    margin: 0;
    padding: 0;
  }

  a {
    color: currentColor;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    cursor: pointer;
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
`;

const Container = styled.div`
  display: flex;
`;

const itemList = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Settings", path: "/settings" },
];

export function App() {
  const [selectedRoute, onSelectRoute] = useState("Home");

  const onItemClick = (itemName: string) => () => {
    onSelectRoute(itemName);
    const currItem = items.find((item) => item.name === itemName);

    currItem && history.push(currItem.path);
  };

  const items: Item[] = useMemo(() => {
    return itemList.map((item) => ({
      name: item.name,
      path: item.path,
      onClick: onItemClick(item.name),
      selected: item.name === selectedRoute,
    }));
  }, [selectedRoute]);

  const history = createBrowserHistory();

  return (
    <Wrapper>
      <GlobalStylesheet />
      <PageHeader>
        <h3>Container MF app!</h3>
      </PageHeader>

      <PageWrapper>
        <Sidebar items={items} />
        <Container>
          <Suspense fallback={<div> Loading....</div>}>
            <Router history={history}>
              <Switch>
                <Route path={"/dashboard"}>
                  <Dashboard />
                </Route>
                <Route path={"/settings"}>
                  <Settings />
                </Route>
                <Route path="/">
                  <div>This is the home page</div>
                </Route>
              </Switch>
            </Router>
          </Suspense>
        </Container>
      </PageWrapper>
    </Wrapper>
  );
}