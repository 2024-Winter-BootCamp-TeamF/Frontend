import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import ProblemList from "../pages/PracticePage/ProblemList";
import MultipleChoice from "../pages/PracticePage/MultipleChoice";
import Subjective from "../pages/PracticePage/Subjective";
import SolveButton from "../components/SolveButton";
import Footer from "../components/Footer";
import { useLocation, useNavigate } from "react-router-dom";

const GradingResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const problems = location.state?.problems || []; // 원래 템플릿 문제 데이터
  const results = location.state?.results || []; // 채점 API 결과

  console.log("location.state:", location.state);
  console.log("problems from location.state:", problems);
  console.log("results from location.state:", results);

  // 문제와 채점 결과 매칭
  const updatedProblems = problems.map((problem) => ({
    ...problem,
    number: problem.number,
    userAnswer: problem.user_answer || "", // 사용자 답안
    isCorrect: problem.is_correct || false, // 정답 여부
    questionText: problem.question_text || "질문 없음", // 질문 텍스트
    correctAnswer: problem.correct_answer || "", // 정답
    choices: problem.choices || [], // 객관식 선택지 (반환값에 없으면 기본값으로 처리)
  }));

  console.log(
    "updatedProblems:",
    updatedProblems.map((problem) => ({
      id: problem.question_id,
      number: problem.number,
      isCorrect: problem.isCorrect,
      userAnswer: problem.userAnswer,
      choices: problem.choices,
      question: problem.questionText,
    }))
  );

  const handleSolveButtonClick = () => {
    navigate("/note", {
      state: {
        problems: updatedProblems,
        doubleClickedProblems: location.state?.doubleClickedProblems || [], // doubleClickedProblems 추가
      },
    });
  };

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <Container>
          <SidebarWrapper>
            <ProblemList
              problems={updatedProblems.map((problem) => {
                return {
                  number: problem.number,
                  isCorrect: problem.isCorrect,
                };
              })}
              title="정답 여부"
            />
          </SidebarWrapper>
          <ContentWrapper>
            <ProblemDetail>
              {/* 문제 출력 */}
              {updatedProblems.map((problem) => {
                // 사용자 답안을 선택지에서 찾아 selectedOption 설정
                const selectedOption = problem.choices.findIndex((choice) => {
                  return choice.trim() === (problem.userAnswer || "").trim();
                });

                return (
                  <ProblemItem
                    key={problem.question_id}
                    isCorrect={problem.isCorrect} // 정답 여부에 따라 스타일 변경
                  >
                    {problem.question_type === "객관식" ? (
                      <MultipleChoice
                        problem={{
                          id: problem.question_id,
                          question: problem.questionText,
                          choices: problem.choices,
                          selectedOption, // 사용자 답안 선택
                          userAnswer: problem.userAnswer,
                          correctAnswer: problem.correctAnswer,
                        }}
                        number={problem.number} // 문제 번호 전달
                        readOnly={true}
                      />
                    ) : (
                      <Subjective
                        problem={{
                          id: problem.question_id,
                          question: problem.questionText,
                          correctAnswer: problem.correctAnswer,
                          userAnswer: problem.userAnswer,
                        }}
                        number={problem.number} // 문제 번호 전달
                        readOnly={true}
                      />
                    )}
                  </ProblemItem>
                );
              })}
              <ButtonWrapper>
                <SolveButton onClick={handleSolveButtonClick}>
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
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 20px;
`;

export default GradingResults;
