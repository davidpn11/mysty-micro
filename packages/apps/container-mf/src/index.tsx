import { render } from "react-dom";
import { Header, Wrapper } from "./styles";
import { createGlobalStyle } from "styled-components";

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

function App() {
  return (
    <Wrapper>
      <GlobalStylesheet />
      <Header>
        <h3>Container MF app!</h3>
      </Header>
    </Wrapper>
  );
}

render(<App />, document.getElementById("mysty-mf"));
