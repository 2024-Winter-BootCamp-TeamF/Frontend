import React from "react";
import styled, { css } from "styled-components";

const SolveButton = ({ children, onClick, variant = "filled" }) => {
  const parts =
    typeof children === "string" ? children.split("\n") : [children];

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

const StyledButton = styled.button`
  width: 555px;
  height: 85px;
  font-size: 24px;
  line-height: 30px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
  font-family: "HakgyoansimAllimjangTTF-R";
<<<<<<< HEAD

=======
>>>>>>> 1b8a76261748fc7acc5b0f472b039bf2c5e7611e
  /* 기본 스타일 */
  ${({ variant }) =>
    variant === "filled" &&
    css`
<<<<<<< HEAD
      background-color: #5887f4;
      color: white;
      border: none;
      &:hover {
        background-color: white;
        color: #5887f4;
        border: 2px solid #5887f4;
      }
    `}

=======
      background-color: #5887f4; /* 기본 배경색 */
      color: white; /* 기본 글씨색 */
      border: none;
      &:hover {
        background-color: white; /* 호버 시 배경색 */
        color: #5887f4; /* 호버 시 글씨색 */
        border: 2px solid #5887f4; /* 호버 시 테두리 */
      }
    `}
>>>>>>> 1b8a76261748fc7acc5b0f472b039bf2c5e7611e
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
<<<<<<< HEAD

=======
>>>>>>> 1b8a76261748fc7acc5b0f472b039bf2c5e7611e
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
export default SolveButton;
