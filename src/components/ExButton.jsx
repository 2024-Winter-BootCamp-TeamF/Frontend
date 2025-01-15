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

const Button = ({ children, onClick, variant = "filled", ariaLabel = "" }) => (
  <>
    <GlobalStyle />
    <StyledButton onClick={onClick} variant={variant} aria-label={ariaLabel}>
      {children}부가 설명 다운로드
    </StyledButton>
  </>
);

export default Button;

const StyledButton = styled.button`
  width: 230px;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
  font-family: "MangoDdobak-B", sans-serif;

  ${({ variant }) =>
    variant === "filled" &&
    css`
      background-color: #5c85ff;
      color: white;
      border: none;

      &:hover {
        background-color: white; /* 배경을 하얀색으로 변경 */
        color: #5c85ff; /* 글자 색을 파란색으로 변경 */
        border: 2px solid #5c85ff; /* 테두리를 파란색으로 변경 */
      }
    `}

  ${({ variant }) =>
    variant === "outlined" &&
    css`
      background-color: transparent;
      color: #5c85ff;
      border: 2px solid #5c85ff;

      &:hover {
        background-color: white; /* 배경을 하얀색으로 변경 */
        color: #5c85ff; /* 글자 색을 파란색으로 유지 */
        border: 2px solid #5c85ff; /* 테두리는 파란색 그대로 유지 */
      }
    `}

  &:active {
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;
