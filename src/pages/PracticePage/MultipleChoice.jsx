import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// 색상 상수
const COLORS = {
  PRIMARY: "#5887f4",
  SECONDARY: "#F24822",
  BORDER: "#E2DFDF",
};

const MultipleChoice = ({ problem, readOnly, onProblemSolved }) => {
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleDoubleClick = () => {
    if (readOnly) return;
    const newDoubleClickState = !isDoubleClicked;
    setIsDoubleClicked(newDoubleClickState);
    // 더블클릭 상태만 변경하고 선택 상태는 유지
    onProblemSolved(problem.id, true, newDoubleClickState);
  };

  const handleOptionSelect = (index) => {
    if (readOnly) return;

    const newSelectedOption = selectedOption === index ? null : index;
    setSelectedOption(newSelectedOption);

    // 선택 상태 변경 시 더블클릭 상태는 false로 초기화
    if (newSelectedOption !== null) {
      setIsDoubleClicked(false);
      onProblemSolved(problem.id, true, false);
    } else {
      onProblemSolved(problem.id, false, false);
    }
  };

  return (
    <MultipleChoiceContainer
      onDoubleClick={handleDoubleClick}
      isDoubleClicked={isDoubleClicked}
      readOnly={readOnly}
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
              onChange={() => handleOptionSelect(index)}
              checked={selectedOption === index}
              disabled={readOnly}
            />
            <label htmlFor={`${problem.id}-option${index}`}>{option}</label>
          </li>
        ))}
      </ul>
    </MultipleChoiceContainer>
  );
};

// Props 타입 정의
MultipleChoice.propTypes = {
  problem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedAnswer: PropTypes.number,
  }).isRequired,
  readOnly: PropTypes.bool.isRequired,
  onProblemSolved: PropTypes.func.isRequired,
};

const MultipleChoiceContainer = styled.div`
  width: 980px;
  height: 432px;
  background-color: #ffffff;
  border: 3px solid
    ${(props) =>
      props.readOnly
        ? COLORS.PRIMARY
        : props.isDoubleClicked
        ? COLORS.SECONDARY
        : COLORS.PRIMARY};
  padding: 0px;
  box-sizing: border-box;
  border-radius: 10px;
  transition: border-color 0.3s ease;

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    margin: 15px 0;
    font-size: 18px;
    display: flex;
    align-items: center;
  }

  input[type="radio"] {
    margin-left: 50px;
    margin-right: 15px;
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
  margin: 40px 0 0 50px;
  text-align: left;
`;

const Content = styled.p`
  font-size: 24px;
  margin: 0;
  padding: 0 0 25px 50px;
  text-align: left;
`;

export default MultipleChoice;
