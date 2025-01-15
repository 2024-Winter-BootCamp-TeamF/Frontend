// components/ShortAnswer.js
import React from "react";
import styled from "styled-components";

const ShortAnswer = ({ problem }) => {
  return (
    <ShortAnswerContainer>
      <h3>{problem.title}</h3>
      <p>{problem.content}</p>
      <input type="text" placeholder="답을 입력하세요" />
    </ShortAnswerContainer>
  );
};

const ShortAnswerContainer = styled.div`
  width: 980px;
  height: 432px;
  background-color: #ffffff;
  border: 2px solid #5887f4;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;

  input {
    width: 100%;
    height: 40px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export default ShortAnswer;
