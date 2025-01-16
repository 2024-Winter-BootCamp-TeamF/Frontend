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
  height: 213px;
  background-color: #ffffff;
  border: 3px solid #5887f4;

  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;

  h3 {
    text-align: left;
    margin-top: 20px;
    margin-left: 30px;
    font-size: 24px;
  }

  p {
    text-align: left;
    margin-bottom: 20px;
    margin-left: 30px;
    font-size: 24px;
  }

  input {
    width: 850px;
    height: 40px;
    padding: 10px;
    text-align: left;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export default ShortAnswer;
