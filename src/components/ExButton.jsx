import React from "react";
import styled, { css } from "styled-components";

const ExButton = ({
  children,
  onClick,
  variant = "filled",
  ariaLabel = "",
  isActive = false,
}) => (
  <>
    <StyledButton onClick={onClick} variant={variant} aria-label={ariaLabel}>
      {children}
    </StyledButton>
  </>
);

export default ExButton;

const StyledButton = styled.button`
  width: 230px;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;

  ${({ variant, isActive }) =>
    variant === "filled" &&
    css`
      background-color: ${isActive ? '#5c85ff' : 'white'};
      color: ${isActive ? 'white' : '#5c85ff'};
      border: 2px solid #5c85ff;

      &:hover {
        background-color: #5c85ff;
        color: white;
      }
    `}

  ${({ variant, isActive }) =>
    variant === "outlined" &&
    css`
      background-color: transparent;
      color: #5c85ff;
      border: 2px solid #5c85ff;

      &:hover {
        background-color: #5c85ff;
        color: white;
      }
    `}

  &:active {
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;
