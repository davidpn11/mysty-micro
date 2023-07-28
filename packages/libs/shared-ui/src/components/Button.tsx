import * as React from "react";
import styled, { css } from "styled-components";

type ButtonProps = {
  error?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const ButtonWrapper = styled.button<ButtonProps>`
  border-radius: 5px;
  outline: none;
  background: transparent;
  border: ${(props) =>
    props.error ? "2px solid firebrick" : " 1px solid grey"};
  ${(props) =>
    props.error &&
    css`
      color: firebrick;
    `};
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background: whitesmoke;
    scale: 1.1;
  }
`;

export const Button = (props: React.PropsWithChildren<ButtonProps>) => {
  return <ButtonWrapper {...props}>{props.children}</ButtonWrapper>;
};
