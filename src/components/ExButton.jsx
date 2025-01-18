import React from "react";
import styled, { css } from "styled-components";

const ExButton = ({
  children,
  onClick,
  variant = "filled",
  isActive = false,
}) => (
  <StyledButton onClick={onClick} variant={variant} isActive={isActive}>
    {children}
  </StyledButton>
);

const StyledButton = styled.button`
  // padding: 10px 20px;
  width: 200px;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;

  /* isActive가 true일 때의 스타일 */
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #5c85ff !important;
      color: white !important;
      border: none !important;
    `}

  /* variant에 따른 기본 스타일 */
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

export default ExButton;
