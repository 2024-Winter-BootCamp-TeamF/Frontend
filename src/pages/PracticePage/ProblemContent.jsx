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

const PROBLEM_TYPES = {
  MULTIPLE_CHOICE: "multiple_choice",
  SHORT_ANSWER: "short_answer",
};

const ProblemContent = ({ onButtonClick, readOnly, onProblemSolved }) => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [doubleClickedProblems, setDoubleClickedProblems] = useState(new Set());
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (location.state && location.state.problems) {
      const { multiple_choices, subjectives } = location.state.problems;

      // 문제 데이터를 하나의 배열로 병합하여 상태 저장
      const formattedProblems = [
        ...multiple_choices.map((item, index) => ({
          id: `mc-${index + 1}`,
          question_id: index + 1, // 채점 API에 넘길 ID
          type: "multiple_choice",
          topic: `Q.${index + 1}`, // 문제 번호
          question: item.question,
          correctAnswer: item.answer,
          choices: item.choices,
        })),
        ...subjectives.map((item, index) => ({
          id: `sa-${multiple_choices.length + index + 1}`, // 고유 ID 생성
          question_id: multiple_choices.length + index + 1, // 채점 API에 넘길 ID
          type: "short_answer",
          topic: `Q.${multiple_choices.length + index + 1}`, // 문제 번호
          question: item.question,
          correctAnswer: item.answer,
        })),
      ];
      setProblems(formattedProblems);
    }
  }, [location.state]);

  const renderProblem = (problem) => {
    switch (problem.type) {
      case "multiple_choice":
        return (
          <MultipleChoice
            key={problem.id}
            problem={problem}
            problemNumber={problem.question_id} // 문제 번호 전달
            readOnly={readOnly}
            onProblemSolved={handleProblemSolved}
          />
        );
      case "short_answer":
        return (
          <Subjective
            key={problem.id}
            problem={problem}
            problemNumber={problem.question_id} // 문제 번호 전달
            readOnly={readOnly}
            onProblemSolved={handleProblemSolved}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    setResults(
      problems.map((problem) => ({
        id: problem.id,
        number: problem.id,
        isCorrect: false,
        selectedAnswer: null,
      }))
    );
  }, [problems]);

  const handleProblemSolved = (
    problemId,
    isSolved,
    isDoubleClicked,
    selectedAnswer,
    selectedIndex
  ) => {
    const problem = problems.find((p) => p.id === problemId); // 문제 객체 가져오기
    const correctAnswer = problem.correctAnswer;
    const isCorrect = selectedAnswer === correctAnswer;

    console.log(
      `문제 ID: ${problemId}, 선택한 답: ${selectedAnswer}, 정답 여부: ${isCorrect}`
    );

    // 문제 정보를 localStorage에 저장
    const updatedResults = results.map((result) =>
      result.id === problemId
        ? {
            ...result,
            isCorrect,
            selectedAnswer,
            selectedIndex,
            type: problem.type,
            question: problem.question,
            choices: problem.choices || [],
          }
        : result
    );

    setResults(updatedResults);
    localStorage.setItem("solvedProblems", JSON.stringify(updatedResults));

    setSolvedProblems((prev) => {
      const newSolved = new Set(prev);
      if (isSolved) {
        newSolved.add(problemId);
      } else {
        newSolved.delete(problemId);
      }
      return newSolved;
    });

    setDoubleClickedProblems((prev) => {
      const newDoubleClicked = new Set(prev);
      if (isDoubleClicked) {
        newDoubleClicked.add(problemId);
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

    onProblemSolved(
      problemId,
      isSolved,
      isDoubleClicked,
      selectedAnswer,
      selectedIndex
    );
  };

  const areAllProblemsAnswered = () => {
    return problems.every(
      (problem) =>
        solvedProblems.has(problem.id) || doubleClickedProblems.has(problem.id)
    );
  };

  const handleButtonClick = (onProblemSolved) => {
    if (!areAllProblemsAnswered()) {
      alert("모든 문제를 작성하세요.");
      return;
    }
    onButtonClick(results, onProblemSolved);
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
                onClick={() => handleButtonClick(handleProblemSolved)}
                children={"고생하셨습니다! 이제 채점해볼까요?\n채점하기"}
              ></SolveButton>
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
  onProblemSolved: PropTypes.func,
};

ProblemContent.defaultProps = {
  onButtonClick: () => {},
  readOnly: false,
  onProblemSolved: () => {},
};

export default ProblemContent;
