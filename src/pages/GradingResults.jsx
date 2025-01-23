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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axiosInstance.get("/question/all-questions/");
        setResults(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const safeResults = results || [];

  console.log("전달된 results:", safeResults);

  const handleProblemSolved = (
    problemId,
    isSolved,
    isDoubleClicked,
    selectedAnswer
  ) => {
    console.log(
      `문제 ID: ${problemId}, 해결 여부: ${isSolved}, 선택한 답안: ${selectedAnswer}`
    );
  };

  const submitAnswer = async (questionId, userAnswer) => {
    try {
      const response = await axiosInstance.post("/question/submit-answer", {
        question_id: questionId,
        user_answer: userAnswer,
      });
      console.log("답안 제출 성공:", response.data);
    } catch (error) {
      console.error("답안 제출 실패:", error.message);
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error}</div>;

  return (
    <PageWrapper>
      <Header />
      <MainContent>
        <Container>
          <SidebarWrapper>
            <ProblemList
              problems={safeResults.map((result) => ({
                ...result,
                is_correct: result.isCorrect,
              }))}
              title="정답 여부"
            />
          </SidebarWrapper>
          <ContentWrapper>
            <ProblemDetail>
              {safeResults.length === 0 ? (
                <div>문제가 없습니다.</div>
              ) : (
                safeResults.map((result) => (
                  <ProblemItem key={result.id}>
                    {result.question_type === "객관식" ? (
                      <MultipleChoice
                        problem={{
                          ...result,
                          selectedOption:
                            result.choices[result.selectedIndex] || null,
                          is_correct: result.is_correct,
                          options: result.choices || [],
                        }}
                        readOnly={true}
                      />
                    ) : (
                      <Subjective
                        problem={{
                          ...result,
                          selectedAnswer: result.user_answer || "",
                          is_correct: result.is_correct,
                        }}
                        readOnly={true}
                      />
                    )}
                  </ProblemItem>
                ))
              )}
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
