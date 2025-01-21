import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MultipleChoice from "./MultipleChoice";
import Subjective from "./Subjective";
import ProblemList from "./ProblemList";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SolveButton from "../../components/SolveButton";
import { useNavigate } from "react-router-dom";

const PROBLEM_TYPES = {
  MULTIPLE_CHOICE: "multiple_choice",
  SHORT_ANSWER: "short_answer",
};

const ProblemContent = ({ problems, onButtonClick, readOnly }) => {
  const navigate = useNavigate();
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [doubleClickedProblems, setDoubleClickedProblems] = useState(new Set());
  const [results, setResults] = useState(
    problems.map((problem) => ({
      id: problem.id,
      number: problem.id,
      isCorrect: false,
    }))
  );

  const handleProblemSolved = (
    problemId,
    isSolved,
    isDoubleClicked,
    selectedAnswer
  ) => {
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

    setResults((prev) =>
      prev.map((result) =>
        result.id === problemId ? { ...result, isCorrect: isSolved } : result
      )
    );
  };

  const areAllProblemsAnswered = () => {
    return problems.every(
      (problem) =>
        solvedProblems.has(problem.id) || doubleClickedProblems.has(problem.id)
    );
  };

  const handleButtonClick = () => {
    if (!areAllProblemsAnswered()) {
      alert("모든 문제를 작성하세요.");
      return;
    }
    navigate("/Checkcomplete");
  };

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
              <SolveButton onClick={handleButtonClick}>제출하기</SolveButton>
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
  margin: 50px 0;
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
};

ProblemContent.defaultProps = {
  onButtonClick: () => {},
  readOnly: false,
};

export default ProblemContent;
