import React from "react";
import styled, { css, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'MangoDdobak-B';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/MangoDdobak-B.woff2') format('woff2');
    font-style: normal;
  }

  body {
    font-family: 'MangoDdobak-B', sans-serif;
  }
`;

const Button = ({ children, onClick, variant = "filled" }) => (
  <>
    <GlobalStyle />
    <StyledButton onClick={onClick} variant={variant}>
      {children}
    </StyledButton>
  </>
);

export default Button;

const StyledButton = styled.button`
  width: 555px;
  height: 85px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
  font-family: "MangoDdobak-B", sans-serif;

  /* 기본 스타일 */
  ${({ variant }) =>
    variant === "filled" &&
    css`
      background-color: #5887F4; /* 기본 배경색 */
      color: white; /* 기본 글씨색 */
      border: none;

      &:hover {
        background-color: white; /* 호버 시 배경색 */
        color: #5887F4; /* 호버 시 글씨색 */
        border: 2px solid #5887F4; /* 호버 시 테두리 */
      }
    `}

  ${({ variant }) =>
    variant === "outlined" &&
    css`
      background-color: transparent;
      color: #5887F4;
      border: 2px solid #5887F4;

      &:hover {
        background-color: #eef4ff;
      }
    `}

  &:active {
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;
