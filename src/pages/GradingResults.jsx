import React, { useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import ProblemList from "../pages/PracticePage/ProblemList";
import MultipleChoice from "../pages/PracticePage/MultipleChoice";
import Subjective from "../pages/PracticePage/Subjective";
import SolveButton from "../components/SolveButton";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";

const GradingResults = () => {
  const location = useLocation();
  const problems = location.state?.problems || [];
  const results = location.state?.results || [];

  // 더블 클릭 활성화 상태를 관리하는 상태 변수
  const [doubleClicked, setDoubleClicked] = useState(
    problems.reduce((acc, problem) => {
      acc[problem.question_id] = false; // 초기값: 모든 문제는 더블 클릭 비활성화
      return acc;
    }, {})
  );

  const handleDoubleClick = (questionId) => {
    setDoubleClicked((prev) => ({
      ...prev,
      [questionId]: !prev[questionId], // 더블 클릭 상태 토글
    }));
  };

  // 문제 데이터와 채점 결과를 결합
  const updatedProblems = problems.map((problem) => {
    // explanation이 null인지 여부로 정답/오답 판단
    const isCorrect = problem.explanation === null;

    return {
      ...problem,
      number: problem.number,
      userAnswer: problem.user_answer || "",
      isCorrect, // 정답 여부 설정
      questionText: problem.question_text || "질문 없음",
      correctAnswer: problem.correct_answer || "",
      choices: problem.choices || [],
    };
  });

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <Container>
          <SidebarWrapper>
            <ProblemList
              problems={updatedProblems.map((problem) => ({
                number: problem.number,
                isCorrect: problem.isCorrect,
              }))}
              title="정답 여부"
            />
          </SidebarWrapper>
          <ContentWrapper>
            <ProblemDetail>
              {updatedProblems.map((problem) => {
                const isDoubleClicked = doubleClicked[problem.question_id];
                const isGraded = problem.explanation !== undefined;

                // 조건부 색상 설정
                let problemColor = "PRIMARY";
                if (isGraded) {
                  problemColor = problem.isCorrect
                    ? "PRIMARY"
                    : isDoubleClicked
                    ? "SECONDARY"
                    : "PRIMARY";
                } else if (isDoubleClicked) {
                  problemColor = "SECONDARY";
                }
                console.log("문제 상태:", {
                  question_id: problem.question_id,
                  isCorrect: problem.isCorrect,
                  isDoubleClicked,
                  problemColor,
                  resultsLength: results.length,
                });

                return (
                  <ProblemItem
                    key={problem.question_id}
                    isCorrect={problem.isCorrect}
                    problemColor={problemColor}
                    onDoubleClick={() => handleDoubleClick(problem.question_id)}
                  >
                    {problem.question_type === "객관식" ? (
                      <MultipleChoice
                        problem={{
                          id: problem.question_id,
                          question: problem.questionText,
                          choices: problem.choices,
                          selectedOption: problem.choices.findIndex(
                            (choice) =>
                              choice.trim() ===
                              (problem.userAnswer || "").trim()
                          ),
                          userAnswer: problem.userAnswer,
                          correctAnswer: problem.correctAnswer,
                        }}
                        number={problem.number}
                        readOnly={true}
                        isGraded={isGraded} // 채점 상태 추가 전달
                      />
                    ) : (
                      <Subjective
                        problem={{
                          id: problem.question_id,
                          question: problem.questionText,
                          correctAnswer: problem.correctAnswer,
                          userAnswer: problem.userAnswer,
                        }}
                        number={problem.number}
                        readOnly={true}
                        isGraded={problem.explanation !== undefined} // 채점 여부 전달
                      />
                    )}
                  </ProblemItem>
                );
              })}
              <ButtonWrapper>
                <SolveButton>
                  틀린 문제는 복습하고 넘어가자!
                  <br />
                  오답 노트 생성하기
                </SolveButton>
              </ButtonWrapper>
            </ProblemDetail>
          </ContentWrapper>
        </Container>
      </MainContent>
      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
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
  background-color: ${(props) =>
    props.problemColor === "PRIMARY"
      ? "#dff0d8"
      : "#f2dede"}; // PRIMARY: 초록, SECONDARY: 빨강
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export default GradingResults;
