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
  // padding 세로 가로 길이 조절 가능
  padding: 40px 200px;
  font-size: 16px;
  font-weight: bold;
  // 각지게 하려면 border-radius의 px 수 낮추면 가능
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
  font-family: "MangoDdobak-B", sans-serif;

  /* 기본 스타일 */
  ${({ variant }) =>
    variant === "filled" &&
    css`
      background-color: #5c85ff;
      color: white;
      border: none;

      &:hover {
        background-color: #4668cc;
      }
    `}

  ${({ variant }) =>
    variant === "outlined" &&
    css`
      background-color: transparent;
      color: #5c85ff;
      border: 2px solid #5c85ff;

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
