import styled, { createGlobalStyle } from "styled-components";

const Wrapper = styled.div`
  background: orange;
`;

const GlobalStyle = createGlobalStyle`
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

export function Standalone(props: React.PropsWithChildren<{}>) {
  return (
    <Wrapper>
      <GlobalStyle /> {props.children}
    </Wrapper>
  );
}
