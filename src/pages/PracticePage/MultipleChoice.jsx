import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// 색상 상수
const COLORS = {
  PRIMARY: "#5887f4",
  SECONDARY: "#F24822",
  BORDER: "#E0E0E0",
  BACKGROUND: "#ffffff",
};

const MultipleChoice = ({ problem, readOnly, onProblemSolved }) => {
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // choices가 유효한 배열인지 확인
  const choices = Array.isArray(problem.choices) ? problem.choices : [];

  const handleDoubleClick = (e) => {
    e.preventDefault();
    if (readOnly) return;

    const newDoubleClickState = !isDoubleClicked;
    setIsDoubleClicked(newDoubleClickState);

    onProblemSolved(
      problem.id,
      selectedOption !== null, // isSolved
      newDoubleClickState, // isDoubleClicked
      selectedOption // 선택한 정답 전달
    );
  };

  const handleOptionSelect = (index) => {
    if (readOnly) return;

    const newSelectedOption = selectedOption === index ? null : index;
    setSelectedOption(newSelectedOption);

    // 정답 여부 확인
    const isSolved = newSelectedOption !== null; // 선택한 답안이 있을 경우 true

    onProblemSolved(
      problem.id,
      isSolved, // isSolved는 선택 여부에 따라 true
      isDoubleClicked, // 현재 더블클릭 상태 유지
      choices[newSelectedOption] // 선택한 정답 전달
    );
  };

  return (
    <MultipleChoiceContainer
      onDoubleClick={handleDoubleClick}
      isDoubleClicked={isDoubleClicked}
      readOnly={readOnly}
      style={{
        borderColor: window.location.href.includes("grading-results")
          ? problem.is_correct
            ? COLORS.PRIMARY
            : "#F24822" // 경로에 따라 테두리 색상 설정
          : isDoubleClicked
          ? COLORS.SECONDARY // 더블클릭 시 색상
          : COLORS.PRIMARY, // 기본 테두리 색상
      }}
    >
      <Title>{problem.topic}</Title>
      <Content>{problem.question}</Content>
      <ul>
        {choices.map((choice, index) => (
          <li key={index}>
            <input
              type="radio"
              name={problem.id}
              id={`${problem.id}-choice${index}`}
              onChange={() => handleOptionSelect(index)}
              checked={selectedOption === index}
              disabled={readOnly}
            />
            <label htmlFor={`${problem.id}-choice-${index}`}>{choice}</label>
          </li>
        ))}
      </ul>
    </MultipleChoiceContainer>
  );
};

MultipleChoice.propTypes = {
  problem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    topic: PropTypes.string.isRequired,
    question: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  readOnly: PropTypes.bool.isRequired,
  onProblemSolved: PropTypes.func.isRequired,
};

const MultipleChoiceContainer = styled.div`
  width: 900px;
  height: auto;
  background-color: #ffffff;
  border: 3px solid ${COLORS.BORDER}; // 기본 테두리 색상
  padding: 50px 50px 41px 50px;
  box-sizing: border-box;
  border-radius: 10px;
  transition: border-color 0.3s ease;

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 15px;
    line-height: 45px;
  }

  input[type="radio"] {
    appearance: none;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    border: 3px solid ${COLORS.BORDER};
    transition: border 0.3s ease-in-out;
  }

  input[type="radio"]:checked {
    border: 0.5em solid
      ${(props) => (props.isDoubleClicked ? COLORS.SECONDARY : COLORS.PRIMARY)};
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
  font-size: 24px;
  text-align: left;
`;

const Content = styled.p`
  font-size: 24px;
  margin-bottom: 30px;
  text-align: left;
`;

export default MultipleChoice;
