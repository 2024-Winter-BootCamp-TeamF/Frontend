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

// 컴포넌트 이름을 파일명과 일치하도록 Subjective로 변경
const Subjective = ({ number, problem, readOnly, onProblemSolved }) => {
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
      style={{
        borderColor: window.location.href.includes("grading-results")
          ? problem.is_correct
            ? COLORS.PRIMARY
            : COLORS.SECONDARY // 경로에 따라 테두리 색상 설정
          : isDoubleClicked
          ? COLORS.SECONDARY // 더블클릭 시 색상
          : COLORS.PRIMARY, // 기본 테두리 색상
      }}
    >
      <Title>{`Q.${number}`}</Title>
      <Content>{problem.question}</Content>
      {isGraded ? (
        // 채점 후에는 정답과 사용자 답안을 모두 출력
        <GradingSection>
          <AnswerWrapper isCorrect>
            <Label>정답 : </Label>
            <Text>{problem.correctAnswer || "없음"}</Text>
          </AnswerWrapper>
          <AnswerWrapper
            isCorrect={problem.userAnswer === problem.correctAnswer}
          >
            <Label>사용자가 입력한 답 : </Label>
            <Text>{problem.userAnswer || "입력된 답이 없습니다."}</Text>
          </AnswerWrapper>
        </GradingSection>
      ) : (
        // 채점 전에는 입력 필드만 표시
        <Input
          type="text"
          placeholder="답을 입력하세요"
          value={readOnly ? problem.userAnswer : answer}
          onChange={handleAnswerChange}
          disabled={readOnly}
        />
      )}
    </SubjectiveContainer>
  );
};

Subjective.propTypes = {
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
  border: 3px solid ${COLORS.BORDER}; // 기본 테두리 색상
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

const GradingSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AnswerWrapper = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  background-color: ${(props) =>
    props.isCorrect ? "#eaffea" : "#ffecec"}; // 정답 초록색, 오답 빨간색
  padding: 10px;
  border-radius: 4px;
`;

const Label = styled.span`
  font-weight: 700;
  font-size: 18px;
`;

const Text = styled.span`
  font-size: 18px;
`;

export default Subjective;
