import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// 색상 상수
const COLORS = {
  PRIMARY: "#5887f4",
  SECONDARY: "#F24822",
  CORRECT: "#28a745", // 정답 강조 색상
  BORDER: "#E0E0E0",
  BACKGROUND: "#ffffff",
};

const MultipleChoice = ({
  number,
  problem,
  readOnly,
  onProblemSolved,
  isGraded,
}) => {
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [selectedOption, setSelectedOption] = useState(problem.selectedOption);

  const handleDoubleClick = (e) => {
    e.preventDefault();
    if (readOnly) return;

    const newDoubleClickState = !isDoubleClicked;
    setIsDoubleClicked(newDoubleClickState);

    onProblemSolved(
      problem.id,
      selectedOption !== null, // isSolved
      newDoubleClickState, // isDoubleClicked
      problem.choices[selectedOption] // 선택한 정답 전달
    );
  };

  const handleOptionSelect = (index) => {
    if (readOnly) return;

    const newSelectedOption = selectedOption === index ? null : index;
    setSelectedOption(newSelectedOption);

    const isSolved = newSelectedOption !== null;

    // 부모 컴포넌트에 선택된 답 전달
    onProblemSolved(
      problem.id,
      isSolved,
      isDoubleClicked,
      problem.choices[newSelectedOption] || "" // 선택된 답안 전달
    );
  };

  return (
    <MultipleChoiceContainer
      onDoubleClick={handleDoubleClick}
      isDoubleClicked={isDoubleClicked}
      isGraded={isGraded}
      isWrong={isGraded && problem.userAnswer !== problem.correctAnswer} // 채점 후 정답 여부 판단
      readOnly={readOnly}
    >
      <Title>{`Q.${number}`}</Title>
      <Content>{problem.question}</Content>
      <ul>
        {(problem.choices || []).map(
          (
            choice,
            index // choices가 없으면 빈 배열로 처리
          ) => {
            const isCorrect =
              choice.trim() === (problem.correctAnswer || "").trim();
            const isUserAnswer =
              choice.trim() === (problem.userAnswer || "").trim();
            return (
              <li key={index}>
                <StyledRadio
                  type="radio"
                  name={`multiple-choice-${problem.id}`}
                  id={`choice-${problem.id}-${index}`}
                  onChange={() => handleOptionSelect(index)}
                  checked={selectedOption === index}
                  disabled={readOnly}
                  isWrong={
                    isGraded &&
                    problem.userAnswer === problem.choices[index] &&
                    problem.userAnswer !== problem.correctAnswer // 사용자 답안이 틀린 경우
                  }
                  isSelected={selectedOption === index} // 선택 여부
                  isDoubleClicked={isDoubleClicked} // 더블클릭 여부 전달
                />
                <StyledLabel
                  htmlFor={`choice-${problem.id}-${index}`}
                  isCorrect={isCorrect}
                  isUserAnswer={isUserAnswer}
                  isGraded={isGraded}
                >
                  {choice}
                </StyledLabel>
              </li>
            );
          }
        )}
      </ul>
    </MultipleChoiceContainer>
  );
};

MultipleChoice.propTypes = {
  number: PropTypes.number.isRequired,
  problem: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    question: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.string).isRequired,
    selectedOption: PropTypes.number,
    userAnswer: PropTypes.string.isRequired,
    correctAnswer: PropTypes.string.isRequired,
    isCorrect: PropTypes.bool.isRequired,
  }).isRequired,
  readOnly: PropTypes.bool.isRequired,
};

const MultipleChoiceContainer = styled.div`
  width: 900px;
  height: auto;
  background-color: #ffffff;
  border: 3px solid
    ${(props) =>
      props.isGraded
        ? props.isWrong
          ? COLORS.SECONDARY // 채점 후 오답
          : COLORS.PRIMARY // 채점 후 정답
        : props.isDoubleClicked
        ? COLORS.SECONDARY // 채점 전 더블클릭
        : COLORS.PRIMARY}; // 채점 전 기본값
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
`;

const StyledRadio = styled.input`
  appearance: none;
  border: 3px solid ${COLORS.BORDER};
  border-radius: 50%;
  width: 28px;
  height: 28px;
  transition: all 0.3s ease-in-out;

  &:checked {
    border: 0.5em solid
      ${(props) =>
        props.isDoubleClicked
          ? COLORS.SECONDARY // 더블클릭된 경우
          : props.isWrong
          ? COLORS.SECONDARY // 사용자 답안이 틀린 경우
          : COLORS.PRIMARY}; // 기본 정답
    background-color: #ffffff; /* 체크된 상태에서도 배경은 흰색 유지 */
  }

  &:focus-visible {
    outline-offset: max(2pxx, 0.1em);
  }

  &:hover {
    box-shadow: 0 0 0 max(3px, 0.2em) #e2dfdf; /* hover 시 음영 추가 */
    cursor: pointer;
  }

  &:disabled {
    background-color: ${(props) =>
      props.checked
        ? "#ffffff"
        : "#d3d3d3"}; /* 체크된 버튼은 흰색, 나머지는 회색 */
    box-shadow: none;
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const StyledLabel = styled.label`
  font-size: 18px;
  color: ${(props) =>
    props.isGraded
      ? props.isCorrect
        ? COLORS.CORRECT // 채점 후 정답 초록색
        : props.isUserAnswer
        ? COLORS.SECONDARY // 채점 후 사용자 답안 빨간색
        : "black"
      : "black"}; // 채점 전에는 기본 색상 유지
  background-color: ${(props) =>
    props.isGraded
      ? props.isCorrect
        ? "#eaffea" // 채점 후 정답 배경색
        : props.isUserAnswer
        ? "#ffecec" // 채점 후 사용자 답안 배경색
        : "transparent"
      : "transparent"}; // 채점 전에는 배경색 없음
  padding: 0 10px;
  border-radius: 5px;
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
