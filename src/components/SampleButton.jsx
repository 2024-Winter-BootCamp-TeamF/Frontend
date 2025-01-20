import React from "react";
import styled, { css } from "styled-components";

const SampleButton = ({ children, onClick, variant = "filled" }) => (
  <>
    <StyledButton onClick={onClick} variant={variant}>
      {children}
    </StyledButton>
  </>
);

export default SampleButton;

const StyledButton = styled.button`
  width: 265px;
  height: 68px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-sizing: border-box;
  font-family: "HakgyoansimAllimjangTTF-R";

  /* 기본 스타일 */
  ${({ variant }) =>
    variant === "filled" &&
    css`
      background-color: #5c85ff; /* 기본 배경색 */
      color: white; /* 기본 글씨색 */
      border: none;

      &:hover {
        background-color: white; /* 호버 시 배경색 */
        color: #5c85ff; /* 호버 시 글씨색 */
        border: 2px solid #5c85ff; /* 호버 시 테두리 */
        font-weight: 700; /* 호버 시 더 두껍게 변경 */
      }
    `}

  ${({ variant }) =>
    variant === "outlined" &&
    css`
      background-color: transparent;
      color: #5c85ff;
      border: 2px solid #5c85ff;

      &:hover {
        background-color: white;
        font-weight: 700; /* 호버 시 더 두껍게 변경 */
      }
    `}

  &:active {
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;
