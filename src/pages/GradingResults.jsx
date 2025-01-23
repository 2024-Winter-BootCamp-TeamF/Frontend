import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import ProblemList from "../pages/PracticePage/ProblemList";
import MultipleChoice from "../pages/PracticePage/MultipleChoice";
import Subjective from "../pages/PracticePage/Subjective";
import SolveButton from "../components/SolveButton";
import Footer from "../components/Footer";
import axiosInstance from "../axiosInstance";

const GradingResults = () => {
  const [results, setResults] = useState([]);

  // 컴포넌트가 마운트될 때 API 호출
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosInstance.get("/question/all-questions/");
        const formattedResults = response.data.slice(-10).map((problem) => {
          // 문제 ID와 질문 텍스트를 콘솔에 출력
          console.log(
            "문제 ID:",
            problem.id,
            "질문 텍스트:",
            problem.question_text
          );

          // 채점 API 호출
          handleProblemSolved(problem.id, "사용자가 선택한 답");

          return {
            problem_id: problem.id,
            question: problem.question_text,
            answer: problem.answer,
            choices: problem.choices,
            created_at: problem.created_at,
            question_topic: problem.question_topic,
            question_type: problem.question_type,
          };
        });
        setResults(formattedResults);
      } catch (error) {
        console.error("데이터 가져오기 오류:", error);
      }
    };

    fetchResults();
  }, []);

  const handleProblemSolved = async (problemId, selectedAnswer) => {
    // 채점 API 호출
    try {
      const response = await axiosInstance.post("/question/submit-answer/", {
        question_id: problemId, // 문제 ID를 여기에 지정
        user_answer: selectedAnswer, // 사용자가 선택한 답안
      });
      console.log("채점 API 응답 메시지:", response.data);
    } catch (error) {
      console.error(
        "API 호출 오류:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <Container>
          <SidebarWrapper>
            <ProblemList problems={results} title="정답 여부" />
          </SidebarWrapper>
          <ContentWrapper>
            <ProblemDetail>
              {results.map((result) => (
                <ProblemItem key={result.problem_id}>
                  {result.question_type === "객관식" ? (
                    <MultipleChoice
                      problem={{
                        ...result,
                        selectedOption: result.selectedAnswer || null,
                        is_correct: result.is_correct,
                      }}
                      readOnly={true}
                      onProblemSolved={handleProblemSolved}
                    />
                  ) : (
                    <Subjective
                      problem={{
                        ...result,
                        selectedAnswer: result.answer || "",
                        is_correct: result.is_correct,
                      }}
                      readOnly={true}
                      onProblemSolved={handleProblemSolved}
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
  text-align: center;
  margin-top: 20px;
`;

export default GradingResults;
