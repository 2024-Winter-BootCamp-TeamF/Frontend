import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MultipleChoice from "./MultipleChoice";
import Subjective from "./Subjective";
import ProblemList from "./ProblemList";
import Header from "../../components/Header";
import Button from "../../components/SolveButton";
import Footer from "../../components/Footer";

// 문제 타입 상수 정의
const PROBLEM_TYPES = {
  MULTIPLE_CHOICE: "multiple_choice",
  SHORT_ANSWER: "short_answer",
};

const ProblemContent = ({ problems, onButtonClick, readOnly }) => {
  // 풀린 문제들의 ID를 저장하는 상태
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [doubleClickedProblems, setDoubleClickedProblems] = useState(new Set());

  // 문제가 풀렸을 때 호출되는 핸들러
  const handleProblemSolved = (problemId, isSolved, isDoubleClicked) => {
    // 풀이 상태 업데이트
    setSolvedProblems((prev) => {
      const newSolved = new Set(prev);
      if (isSolved) {
        newSolved.add(problemId);
      } else {
        newSolved.delete(problemId);
      }
      return newSolved;
    });

    // 더블클릭 상태 업데이트
    setDoubleClickedProblems((prev) => {
      const newDoubleClicked = new Set(prev);
      if (isDoubleClicked) {
        newDoubleClicked.add(problemId);
        // 더블클릭된 경우 solved 상태는 false로
        setSolvedProblems((prev) => {
          const newSolved = new Set(prev);
          newSolved.delete(problemId);
          return newSolved;
        });
      } else {
        newDoubleClicked.delete(problemId);
      }
      return newDoubleClicked;
    });
  };

  // 모든 문제가 풀렸는지 확인하는 함수
  const areAllProblemsAnswered = () => {
    return problems.every(
      (problem) =>
        solvedProblems.has(problem.id) || doubleClickedProblems.has(problem.id)
    );
  };

  // 버튼 클릭 핸들러
  const handleButtonClick = () => {
    if (!areAllProblemsAnswered()) {
      alert("모든 문제를 작성하세요.");
      return;
    }

    // 모든 문제가 완료되었을 때
    alert("채점 중입니다.");
    if (typeof onButtonClick === "function") {
      onButtonClick();
    }
  };

  // problems 배열에 isSolved 속성을 추가
  const problemsWithStatus = problems.map((problem) => ({
    ...problem,
    isSolved: solvedProblems.has(problem.id),
    isDoubleClicked: doubleClickedProblems.has(problem.id),
  }));

  const renderProblem = (problem) => {
    switch (problem.type) {
      case PROBLEM_TYPES.MULTIPLE_CHOICE:
        return (
          <MultipleChoice
            problem={problem}
            readOnly={readOnly}
            onProblemSolved={handleProblemSolved}
          />
        );
      case PROBLEM_TYPES.SHORT_ANSWER:
        return (
          <Subjective
            problem={problem}
            readOnly={readOnly}
            onProblemSolved={handleProblemSolved}
          />
        );
      default:
        return null;
    }
  };

  return (
    <PageWrapper>
      <Header />
      <Container>
        <ProblemList problems={problemsWithStatus} />
        <ContentWrapper>
          <ProblemDetail>
            {problems.map((problem) => (
              <ProblemItem key={problem.id}>
                {renderProblem(problem)}
              </ProblemItem>
            ))}
          </ProblemDetail>
          <ButtonWrapper>
            <Button onClick={handleButtonClick}>
              고생하셨습니다!
              <br />
              채점하기
            </Button>
          </ButtonWrapper>
        </ContentWrapper>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

ProblemContent.propTypes = {
  problems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  onButtonClick: PropTypes.func,
  readOnly: PropTypes.bool,
};

ProblemContent.defaultProps = {
  onButtonClick: () => {},
  readOnly: false,
};

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  margin-top: 100px;
  flex: 1;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 200px;
  margin-top: 100px;
  align-items: center;
`;

const ProblemDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProblemItem = styled.div`
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  margin: 50px 0;
`;

export default ProblemContent;
