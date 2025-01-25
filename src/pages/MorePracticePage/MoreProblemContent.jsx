import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MoreMultipleChoice from "./MoreMultipleChoice";
import MoreSubjective from "./MoreSubjective";
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import MoreProblemList from "./MoreProblemList";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SolveButton from "../../components/SolveButton";
import axios from "axios";

const MoreProblemContent = ({ onButtonClick, readOnly, onProblemSolved }) => {
  const [problems, setProblems] = useState([]);
  const [results, setResults] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState(new Set());
  const [doubleClickedProblems, setDoubleClickedProblems] = useState(new Set());
  const navigate = useNavigate();
  const location = useLocation();

  axios.defaults.baseURL = "http://localhost:8000"; // 서버 주소로 설정

  // 문제 데이터를 location.state에서 받아와 상태에 저장
  useEffect(() => {
    const receivedProblems = location.state?.problems;

    if (Array.isArray(receivedProblems)) {
      console.log("Received Problems:", receivedProblems); // 문제 데이터 확인

      // 문제 번호 추가
      const formattedProblems = receivedProblems.map((problem, index) => ({
        ...problem,
        number: index + 1, // 문제 번호 설정
        userAnswer: "",
        topic: problem.topic || problem.question_topic || "기본", // topic 필드 처리
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
    switch (problem.type) {
      case "객관식":
        return (
          <MoreMultipleChoice
            key={problem.question_id}
            number={problem.number} // 문제 번호 전달
            problem={{
              id: problem.question_id,
              question: problem.question,
              choices: problem.choices,
              correctAnswer: problem.answer,
              topic: problem.topic,
            }}
            readOnly={readOnly}
            onProblemSolved={handleProblemSolved} // 문제 해결 함수 전달
          />
        );
      case "주관식":
        return (
          <MoreSubjective
            key={problem.question_id}
            number={problem.number} // 문제 번호 전달
            problem={{
              id: problem.question_id,
              question: problem.question,
              correctAnswer: problem.answer,
              topic: problem.topic,
            }}
            readOnly={readOnly}
            onProblemSolved={handleProblemSolved} // 문제 해결 함수 전달
          />
        );
      default:
        return null;
    }
  };

  const handleProblemSolved = (
    problemId,
    isSolved,
    isDoubleClicked,
    selectedAnswer
  ) => {
    // 디버깅용 로그
    // console.log("문제 ID:", problemId);
    // console.log("해결 여부 (isSolved):", isSolved);
    // console.log("더블클릭 여부 (isDoubleClicked):", isDoubleClicked);
    // console.log("선택된 답변 (selectedAnswer):", selectedAnswer);

    setProblems((prevProblems) =>
      prevProblems.map((problem) =>
        problem.question_id === problemId
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
        solvedProblems.has(problem.question_id) ||
        doubleClickedProblems.has(problem.id)
    );
  };

  const submitAnswers = async () => {
    const token = localStorage.getItem("accessToken"); // 인증 토큰 가져오기
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const responses = await Promise.all(
        problems.map(async (problem) => {
          const payload = {
            question_id: problem.question_id,
            user_answer: problem.userAnswer || "",
          };

          console.log("Payload:", payload); // 전송 데이터 로그

          const { data } = await axios.post(
            "/api/morequestion/submit-answer/",
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
          };
        })
      );

      const firstTopic = problems[0]?.topic || ""; // 첫 번째 문제의 topic
      console.log("First Topic:", firstTopic); // 전달될 토픽 확인
      console.log("Navigate로 전달되는 데이터:", {
        problems: responses,
        firstTopic,
      });

      // 문제 데이터를 채점 결과 페이지로 전달
      navigate("/grading-results", {
        state: { problems: responses, firstTopic },
      });
    } catch (error) {
      console.error("채점 중 오류 발생:", error);
      alert("채점 요청 중 오류가 발생했습니다.");
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
    isSolved: solvedProblems.has(problem.question_id),
    isDoubleClicked: doubleClickedProblems.has(problem.question_id),
    isCorrect:
      results.find((result) => result.question_id === problem.question_id)
        ?.isCorrect || false,
  }));

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <Container>
          <SidebarWrapper>
            <MoreProblemList problems={problemsWithStatus} />
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

MoreProblemContent.propTypes = {
  onButtonClick: PropTypes.func,
  readOnly: PropTypes.bool,
  onProblemSolved: PropTypes.func,
};

MoreProblemContent.defaultProps = {
  onButtonClick: () => {},
  readOnly: false,
  onProblemSolved: () => {},
};

export default MoreProblemContent;
