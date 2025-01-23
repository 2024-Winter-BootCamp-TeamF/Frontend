import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MultipleChoice from "./MultipleChoice";
import Subjective from "./Subjective";
import ProblemList from "./ProblemList";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SolveButton from "../../components/SolveButton";
import { useNavigate, useLocation } from "react-router-dom";

const ProblemContent = ({ onButtonClick, readOnly, onProblemSolved }) => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [doubleClickedProblems, setDoubleClickedProblems] = useState(new Set());
  const [results, setResults] = useState([]);

  // 문제 데이터를 location.state에서 받아와 상태에 저장
  useEffect(() => {
    const receivedProblems = location.state?.problems;

    if (Array.isArray(receivedProblems)) {
      // 문제 번호 추가
      const formattedProblems = receivedProblems.map((problem, index) => ({
        ...problem,
        number: index + 1, // 문제 번호 설정
      }));
      setProblems(formattedProblems);
      console.log("Practice 페이지에서 받은 데이터:", formattedProblems);
    } else {
      console.error("problems 데이터가 올바르지 않습니다:", receivedProblems);
      setProblems([]);
    }
  }, [location.state]);

  // 문제 해결 상태 초기화
  useEffect(() => {
    setResults(
      problems.map((problem) => ({
        id: problem.id,
        isCorrect: false,
        selectedAnswer: null,
      }))
    );
  }, [problems]);

  const renderProblem = (problem) => {
    switch (problem.question_type) {
      case "객관식":
        return (
          <MultipleChoice
            key={problem.id}
            number={problem.number} // 문제 번호 전달
            problem={{
              id: problem.id,
              question: problem.question_text,
              choices: problem.choices,
              correctAnswer: problem.answer,
            }}
            readOnly={readOnly}
            onProblemSolved={handleProblemSolved} // 문제 해결 함수 전달
          />
        );
      case "주관식":
        return (
          <Subjective
            key={problem.id}
            number={problem.number} // 문제 번호 전달
            problem={{
              id: problem.id,
              question: problem.question_text,
              correctAnswer: problem.answer,
            }}
            readOnly={readOnly}
            onProblemSolved={handleProblemSolved} // 문제 해결 함수 전달
          />
        );
      default:
        return null;
    }
  };

  // 문제 해결 상태 업데이트
  const handleProblemSolved = (
    problemId,
    isSolved,
    isDoubleClicked,
    selectedAnswer
  ) => {
    const correctAnswer = problems.find(
      (problem) => problem.id === problemId
    ).correctAnswer;

    const isCorrect = selectedAnswer === correctAnswer;

    setSolvedProblems((prev) => {
      const newSet = new Set(prev);
      if (isSolved) {
        newSet.add(problemId);
      } else {
        newSet.delete(problemId);
      }
      return newSet;
    });

    setDoubleClickedProblems((prev) => {
      const newSet = new Set(prev);
      if (isDoubleClicked) {
        newSet.add(problemId);
      } else {
        newSet.delete(problemId);
      }
      return newSet;
    });

    setResults((prev) =>
      prev.map((result) =>
        result.id === problemId
          ? { ...result, isCorrect, selectedAnswer }
          : result
      )
    );

    onProblemSolved(problemId, isSolved, isDoubleClicked, selectedAnswer);
  };

  // 모든 문제를 해결했는지 확인
  const areAllProblemsAnswered = () => {
    return problems.every(
      (problem) =>
        solvedProblems.has(problem.id) || doubleClickedProblems.has(problem.id)
    );
  };

  // 채점 버튼 클릭 처리
  const handleButtonClick = () => {
    if (!areAllProblemsAnswered()) {
      alert("모든 문제를 작성하세요.");
      return;
    }
    onButtonClick(results, handleProblemSolved);
    navigate("/Checkcomplete");
  };

  const problemsWithStatus = problems.map((problem) => ({
    ...problem,
    isSolved: solvedProblems.has(problem.id),
    isDoubleClicked: doubleClickedProblems.has(problem.id),
    isCorrect:
      results.find((result) => result.id === problem.id)?.isCorrect || false,
  }));

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <Container>
          <SidebarWrapper>
            <ProblemList problems={problemsWithStatus} />
          </SidebarWrapper>
          <ContentWrapper>
            <ProblemDetail>
              {problems.map((problem) => (
                <ProblemItem key={problem.id}>
                  {renderProblem(problem)}
                </ProblemItem>
              ))}
            </ProblemDetail>
            <ButtonWrapper>
              <SolveButton
                onClick={handleButtonClick}
                children={"고생하셨습니다! 이제 채점해볼까요?\n채점하기"}
              />
            </ButtonWrapper>
          </ContentWrapper>
        </Container>
      </MainContent>
      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

const Container = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  justify-content: center;
`;

const SidebarWrapper = styled.div`
  width: 200px;
  margin-right: 80px;
`;

const ContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 50px;
`;

const ProblemDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 50px;
`;

const ProblemItem = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
`;

ProblemContent.propTypes = {
  onButtonClick: PropTypes.func,
  readOnly: PropTypes.bool,
  onProblemSolved: PropTypes.func,
};

ProblemContent.defaultProps = {
  onButtonClick: () => {},
  readOnly: false,
  onProblemSolved: () => {},
};

export default ProblemContent;
