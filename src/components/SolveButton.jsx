import React from "react";
import styled from "styled-components";

const SolveButton = ({ children, onClick }) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  width: 200px;
  height: 80px;
  background-color: #5887f4;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4070d6;
  }
`;

export default SolveButton;
