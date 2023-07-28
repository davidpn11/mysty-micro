import { Wrapper } from "../../styles";
import styled, { createGlobalStyle } from "styled-components";
import { Item, PageHeader } from "shared/Components";
import { Suspense, lazy, useMemo, useState } from "react";
import { Route, Router, Switch, useLocation } from "react-router-dom";

//@ts-ignore
import { createBrowserHistory } from "history";
import { AppSidebar } from "../AppSidebar";

const Dashboard = lazy(() => import("../../modules/dashboard"));
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

export function App() {
  const history = createBrowserHistory();

  return (
    <Wrapper>
      <GlobalStylesheet />
      <PageHeader variant="primary">
        <h3>Container MF app!</h3>
      </PageHeader>

      <Router history={history}>
        <PageWrapper>
          <AppSidebar />
          <Container>
            <Suspense fallback={<div> Loading....</div>}>
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
            </Suspense>
          </Container>
        </PageWrapper>
      </Router>
    </Wrapper>
  );
}
