import React from "react";
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
  const problems = location.state?.problems || []; // 원래 템플릿 문제 데이터
  const results = location.state?.results || []; // 채점 API 결과

  // 문제와 채점 결과 매칭
  const updatedProblems = problems.map((problem) => {
    const result = results.find((res) => res.question_id === problem.id); // 문제 ID 기준 매칭
    return {
      ...problem,
      userAnswer: result?.user_answer || problem.userAnswer || "", // API 결과나 기존 데이터에서 사용자 답안 가져오기
      isCorrect: result?.is_correct || false, // API 결과에서 정답 여부 가져오기
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
                id: problem.id,
                isCorrect: problem.isCorrect,
              }))}
              title="정답 여부"
            />
          </SidebarWrapper>
          <ContentWrapper>
            <ProblemDetail>
              {/* 문제 출력 */}
              {updatedProblems.map((problem) => (
                <ProblemItem
                  key={problem.id}
                  isCorrect={problem.isCorrect} // 정답 여부에 따라 스타일 변경
                >
                  {problem.question_type === "객관식" ? (
                    <MultipleChoice
                      problem={{
                        id: problem.id,
                        question: problem.question_text,
                        choices: problem.choices || [], // 객관식 선택지
                        selectedOption: (problem.choices || []).indexOf(
                          problem.userAnswer
                        ), // 사용자 답안 선택
                        correctAnswer: problem.answer,
                      }}
                      readOnly={true}
                    />
                  ) : (
                    <Subjective
                      problem={{
                        id: problem.id,
                        question: problem.question_text,
                        selectedAnswer: problem.userAnswer || "",
                        correctAnswer: problem.answer,
                      }}
                      readOnly={true}
                    />
                  )}
                </ProblemItem>
              ))}
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

const PageWrapper = styled.div``;

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
