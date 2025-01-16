import React from "react";
import styled, { css } from "styled-components";

const SolveButton = ({ children, onClick, variant = "filled" }) => {
  const parts = children.split("\n");
  return (
    <>
      <StyledButton onClick={onClick} variant={variant}>
        {parts.map((part, index) => (
          <span key={index} className={index > 0 ? "bold" : ""}>
            {part}
            {index < parts.length - 1 && <br />}
          </span>
        ))}
      </StyledButton>
    </>
  );
};

export default SolveButton;

const StyledButton = styled.button`
  width: 555px;
  height: 85px;
  font-size: 24px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;

  /* 기본 스타일 */
  ${({ variant }) =>
    variant === "filled" &&
    css`
      background-color: #5887f4; /* 기본 배경색 */
      color: white; /* 기본 글씨색 */
      border: none;

      &:hover {
        background-color: white; /* 호버 시 배경색 */
        color: #5887f4; /* 호버 시 글씨색 */
        border: 2px solid #5887f4; /* 호버 시 테두리 */
      }
    `}

  ${({ variant }) =>
    variant === "outlined" &&
    css`
      background-color: transparent;
      color: #5887f4;
      border: 2px solid #5887f4;

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

  span.bold {
    font-weight: 700;
  }
`;
