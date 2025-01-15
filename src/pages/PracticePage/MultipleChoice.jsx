import React from "react";
import styled from "styled-components";

const MultipleChoice = ({ problem }) => {
  return (
    <MultipleChoiceContainer>
      <Title>{problem.title}</Title> {/* 스타일 추가 */}
      <Content>{problem.content}</Content> {/* 스타일 추가 */}
      <ul>
        {problem.options.map((option, index) => (
          <li key={index}>
            <input
              type="radio"
              name={problem.id}
              id={`${problem.id}-option${index}`}
            />
            <label htmlFor={`${problem.id}-option${index}`}>{option}</label>
          </li>
        ))}
      </ul>
    </MultipleChoiceContainer>
  );
};

const MultipleChoiceContainer = styled.div`
  width: 980px;
  height: 432px;
  background-color: #ffffff;
  border: 2px solid #5887f4;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 10px 0;
    font-size: 16px;
    color: #333;
    display: flex;
    align-items: center;
  }

  input[type="radio"] {
    margin-right: 10px;
  }
`;

const Title = styled.h3`
  font-size: 24px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Content = styled.p`
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
`;

export default MultipleChoice;
