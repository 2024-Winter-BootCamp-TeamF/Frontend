import React from "react";
import styled, { css } from "styled-components";

const ExButton = ({
  children,
  onClick,
  variant = "filled",
  ariaLabel = "",
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
