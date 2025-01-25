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

// 컴포넌트 이름을 파일명과 일치하도록 Subjective로 변경
const MoreSubjective = ({
  number,
  problem,
  readOnly,
  onProblemSolved,
  isGraded,
}) => {
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleDoubleClick = (e) => {
    e.preventDefault();
    if (readOnly) return;

    const newDoubleClickState = !isDoubleClicked;
    setIsDoubleClicked(newDoubleClickState);

    onProblemSolved(
      problem.id,
      answer.trim().length > 0, // isSolved
      newDoubleClickState, // isDoubleClicked
      answer // 입력한 답 전달
    );
  };

  const handleAnswerChange = (e) => {
    if (readOnly) return;

    const newAnswer = e.target.value;
    setAnswer(newAnswer);

    // 부모 컴포넌트에 입력된 답 전달
    onProblemSolved(
      problem.id,
      newAnswer.trim().length > 0, // 답변 여부
      isDoubleClicked,
      newAnswer // 입력된 답안 전달
    );
  };

  return (
    <SubjectiveContainer
      onDoubleClick={handleDoubleClick}
      isDoubleClicked={isDoubleClicked}
      readOnly={readOnly}
      isGraded={isGraded}
      isWrong={isGraded && problem.userAnswer !== problem.correctAnswer} // 채점 후 정답 여부 판단
    >
      {console.log("정답 확인:", problem.correctAnswer)} {/* 정답 콘솔 출력 */}
      <Title>{`Q.${number}`}</Title>
      <Content>{problem.question}</Content>
      <Input
        type="text"
        placeholder="답을 입력하세요"
        value={readOnly ? problem.userAnswer : answer}
        onChange={handleAnswerChange}
        disabled={readOnly}
      />
    </SubjectiveContainer>
  );
};

MoreSubjective.propTypes = {
  number: PropTypes.number.isRequired, // number를 필수로 설정
  problem: PropTypes.shape({
    id: PropTypes.string,
    topic: PropTypes.string,
    question: PropTypes.string,
    answer: PropTypes.string,
  }).isRequired,
  readOnly: PropTypes.bool.isRequired,
  onProblemSolved: PropTypes.func.isRequired,
};

const SubjectiveContainer = styled.div`
  width: 900px;
  height: auto;
  background-color: ${COLORS.BACKGROUND};
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
  border-radius: 8px;
  transition: border-color 0.3s ease;
`;

const Title = styled.h3`
  text-align: left;
  font-size: 24px;
`;

const Content = styled.p`
  text-align: left;
  font-size: 24px;
  margin-bottom: 30px;
`;

const Input = styled.input`
  width: 100%;
  height: auto;
  padding: 10px;
  font-size: 16px;
  border: 1px solid ${COLORS.BORDER};
  border-radius: 4px;

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

export default MoreSubjective;
