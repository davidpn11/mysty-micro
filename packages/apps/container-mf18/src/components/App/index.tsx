import { Wrapper } from "../../styles";
import styled, { createGlobalStyle } from "styled-components";
import { Item, PageHeader } from "shared/Components";
import { Suspense, lazy, useMemo, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

//@ts-ignore
import { createBrowserHistory } from "history";
import { AppSidebar } from "../AppSidebar";

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
    // onSelectRoute(itemName);
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
      <PageHeader variant="secondary">
        <h3>Container MF app - React 18</h3>
      </PageHeader>

      <BrowserRouter>
        <PageWrapper>
          <AppSidebar />
          <Container>
            <Suspense fallback={<div> Loading....</div>}>
              <Routes>
                <Route path={"/dashboard"} element={<Dashboard />}></Route>
                <Route path={"/settings"} element={<Settings />}></Route>
                <Route
                  path="/"
                  element={<div>This is the home page</div>}
                ></Route>
              </Routes>
            </Suspense>
          </Container>
        </PageWrapper>
      </BrowserRouter>
    </Wrapper>
  );
}
