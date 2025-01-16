import React, { useState } from "react";
import styled from "styled-components";

const MultipleChoice = ({ problem }) => {
  const [selectedOption, setSelectedOption] = useState(null); // 선택된 옵션을 추적

  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  const handleContainerDoubleClick = () => {
    setIsDoubleClicked(!isDoubleClicked); // 컨테이너 더블클릭 시 상태 토글
  };

  const handleRadioDoubleClick = () => {
    setIsDoubleClicked(!isDoubleClicked); // 라디오 버튼 더블클릭 시 상태 토글
  };

  const handleRadioChange = (e) => {
    const newSelectedOption = e.target.id;
    setSelectedOption((prev) =>
      prev === newSelectedOption ? null : newSelectedOption
    ); // 이미 선택된 버튼을 다시 클릭하면 상태 리셋
  };

  return (
    <MultipleChoiceContainer
      onDoubleClick={handleContainerDoubleClick} // 컨테이너 더블클릭
      isDoubleClicked={isDoubleClicked} // 상태 전달
    >
      <Title>{problem.title}</Title>
      <Content>{problem.content}</Content>
      <ul>
        {problem.options.map((option, index) => (
          <li key={index}>
            <input
              type="radio"
              name={problem.id}
              id={`${problem.id}-option${index}`}
              onDoubleClick={handleRadioDoubleClick} // 라디오 버튼 더블클릭
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
  border: 3px solid
    ${(props) => (props.isDoubleClicked ? "#F24822" : "#5887f4")};
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  transition: border-color 0.3s ease;

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
    margin-left: 30px;
    margin-right: 15px;
    appearance: none;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    border: 3px solid #e2dfdf;
    transition: border 0.3s ease-in-out;
  }

  input[type="radio"]:checked {
    border: 0.5em solid
      ${(props) => (props.isDoubleClicked ? "#F24822" : "#5887f4")};
  }

  input[type="radio"]:focus-visible {
    outline-offset: max(2px, 0.1em);
  }

  input[type="radio"]:hover {
    box-shadow: 0 0 0 max(3px, 0.2em) #e2dfdf;
    cursor: pointer;
  }

  input[type="radio"]:disabled {
    background-color: lightgray;
    box-shadow: none;
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const Title = styled.h3`
  color: #121111;
  font-size: 24px;
  margin: 30px 0 0 30px;
  text-align: left; // 왼쪽 정렬 추가
`;

const Content = styled.p`
  font-size: 24px;
  margin: 0;
  padding: 0 0 30px 30px;
  text-align: left;
`;

export default MultipleChoice;
