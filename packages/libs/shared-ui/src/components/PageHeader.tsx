import styled from "styled-components";

type Variant = "primary" | "secondary";
export const PageHeader = styled.header<{ variant?: Variant }>`
  width: 100vw;
  background: ${(props) =>
    props.variant === "primary" ? "lightblue" : "lightsalmon"};
  /* color: lightsalmon */
  height: 100px;
  padding: 12px 16px;
`;
