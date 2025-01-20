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
  width: 180px;
  height: 45px;
  font-family: "HakgyoansimAllimjangTTF-R";
  font-size: 16px;
  font-weight: 500;
  border-radius: 50px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;

  /* isActive가 true일 때의 스타일 */
  ${({ isActive }) =>
    isActive &&
    css`
      background-color: #5887f4 !important;
      color: white !important;
      border: none !important;
      font-weight: 700;
      letter-spacing: 2px;
    `}

  /* variant에 따른 기본 스타일 */
  ${({ variant }) =>
    variant === "filled" &&
    css`
      background-color: #5887f4;
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
      border: 2px solid #5887f4;

      &:hover {
        background-color: #fff;
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
