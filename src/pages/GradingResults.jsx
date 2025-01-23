import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import ProblemList from "../pages/PracticePage/ProblemList";
import MultipleChoice from "../pages/PracticePage/MultipleChoice";
import Subjective from "../pages/PracticePage/Subjective";
import SolveButton from "../components/SolveButton";
import Footer from "../components/Footer";

const GradingResults = ({ onProblemSolved }) => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 문제 정보를 가져옴
    const storedResults = localStorage.getItem("solvedProblems");
    if (storedResults) {
      setResults(JSON.parse(storedResults)); // JSON 파싱하여 상태에 설정
    }
  }, []);

  const handleProblemSolved = (
    problemId,
    isSolved,
    isDoubleClicked,
    selectedAnswer,
    selectedIndex
  ) => {
    // 사용자가 푼 문제의 정보를 처리하는 로직 추가
    console.log(
      `문제 ID: ${problemId}, 해결 여부: ${isSolved}, 선택한 답안: ${selectedAnswer}`
    );

    // results 상태 업데이트
    const updatedResults = results.map((result) =>
      result.id === problemId
        ? {
            ...result,
            isSolved,
            selectedAnswer,
            is_correct: selectedAnswer === result.answer,
          }
        : result
    );
    setResults(updatedResults);
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
                <ProblemItem key={result.id}>
                  {result.type === "multiple_choice" ? (
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
