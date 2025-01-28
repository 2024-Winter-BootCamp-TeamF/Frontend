import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MultipleChoice from "./MultipleChoice";
import Subjective from "./Subjective";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import ProblemList from "./ProblemList";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SolveButton from "../../components/SolveButton";
import axios from "axios";

const ProblemContent = ({ onButtonClick, readOnly, onProblemSolved }) => {
  const [problems, setProblems] = useState([]);
  const [results, setResults] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [doubleClickedProblems, setDoubleClickedProblems] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const navigate = useNavigate();
  const location = useLocation();

  axios.defaults.baseURL = "http://localhost:8000"; // 서버 주소로 설정

  // 문제 데이터를 location.state에서 받아와 상태에 저장
  useEffect(() => {
    const receivedProblems = location.state?.problems;

    if (Array.isArray(receivedProblems)) {
      // 문제 번호 추가
      const formattedProblems = receivedProblems.map((problem, index) => ({
        ...problem,
        number: index + 1, // 문제 번호 설정
        userAnswer: "",
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
    setProblems((prevProblems) =>
      prevProblems.map((problem) =>
        problem.id === problemId
          ? { ...problem, userAnswer: selectedAnswer }
          : problem
      )
    );
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
  };

  // 모든 문제를 해결했는지 확인
  const areAllProblemsAnswered = () => {
    return problems.every(
      (problem) =>
        solvedProblems.has(problem.id) || doubleClickedProblems.has(problem.id)
    );
  };

  const submitAnswers = async () => {
    const token = localStorage.getItem("accessToken"); // 인증 토큰 가져오기
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    setIsLoading(true); // 로딩 시작

    try {
      const responses = await Promise.all(
        problems.map(async (problem) => {
          const payload = {
            question_id: problem.id,
            user_answer: problem.userAnswer || "",
          };

          console.log("Payload:", payload); // 전송 데이터 로그

          const { data } = await axios.post(
            "/api/question/submit-answer",
            payload,
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          return {
            ...problem, // 문제 데이터 포함
            ...data, // API 응답 데이터 병합
            isDoubleClicked: doubleClickedProblems.has(problem.id), // isDoubleClicked 정보 추가
          };
        })
      );

      const firstTopic = problems[0]?.question_topic || ""; // 첫 번째 문제의 topic
      console.log("First Topic:", firstTopic); // 전달될 토픽 확인

      const templateId = location.state?.templateId;

      const storedResults =
        JSON.parse(localStorage.getItem("gradingResults")) || {};
      storedResults[templateId] = responses; // templateId로 데이터 저장
      localStorage.setItem("gradingResults", JSON.stringify(storedResults));

      // 문제 데이터를 채점 결과 페이지로 전달
      navigate("/grading-results", {
        state: {
          problems: responses,
          firstTopic,
          templateId,
          doubleClickedProblems: Array.from(doubleClickedProblems),
        },
      });
    } catch (error) {
      console.error("채점 중 오류 발생:", error);
      alert("채점 요청 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  // 채점 버튼 클릭 처리
  const handleButtonClick = () => {
    if (!areAllProblemsAnswered()) {
      alert("모든 문제를 작성하세요.");
      return;
    }
    submitAnswers();
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
      {isLoading && (
        <LoadingModal>
          <LoadingContent>
            <LoadingSpinner />
            <LoadingText>채점 중입니다. 잠시만 기다려주세요...</LoadingText>
          </LoadingContent>
        </LoadingModal>
      )}
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

const LoadingModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #5887f4;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: #333;
  font-size: 24px;
`;

export default ProblemContent;
