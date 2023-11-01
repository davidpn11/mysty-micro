import styled, { createGlobalStyle } from "styled-components";
import { useStandaloneMount } from "../useStandaloneMount";
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

type Props = {
  mount: MountFn;
};

export function Standalone(props: React.PropsWithChildren<Props>) {
  const ref = useStandaloneMount(props.mount);
  return (
    <Wrapper>
      <GlobalStyle />
      {props.children}
      <div ref={ref} />
      {props.children}
    </Wrapper>
  );
}
