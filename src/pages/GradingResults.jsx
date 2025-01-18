import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";
import correctIcon from "../images/correct.png";
import wrongIcon from "../images/wrong.png";

const GradingResults = () => {
  const results = [
    { number: 1, isCorrect: true },
    { number: 2, isCorrect: false },
    { number: 3, isCorrect: true },
    { number: 4, isCorrect: true },
    { number: 5, isCorrect: true },
    { number: 6, isCorrect: false },
    { number: 7, isCorrect: true },
    { number: 8, isCorrect: true },
    { number: 9, isCorrect: true },
    { number: 10, isCorrect: false },
  ];

  return (
    <PageWrapper>
      <Header />
      <Container>
        <ResultsList>
          <ResultsTitle>정답 여부</ResultsTitle>
          <ProblemList>
            {results.map((result) => (
              <ProblemItem key={result.number}>
                <ProblemNumber>Q{result.number}.</ProblemNumber>
                <ResultIcon>
                  <img
                    src={result.isCorrect ? correctIcon : wrongIcon}
                    alt={result.isCorrect ? "정답" : "오답"}
                    style={{ width: "24px", height: "24px" }}
                  />
                </ResultIcon>
              </ProblemItem>
            ))}
          </ProblemList>
        </ResultsList>
      </Container>
      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ResultsList = styled.div`
  width: 263px;
  background: white;
  border: 3px solid #5887f4;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
`;

const ResultsTitle = styled.h2`
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
`;

const ProblemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ProblemItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: 55px;
`;

const ProblemNumber = styled.span`
  font-size: 24px;
`;

const ResultIcon = styled.span`
  color: ${(props) => (props.isCorrect ? "#4CAF50" : "#F44336")};
  font-size: 24px;
  font-weight: bold;
`;

export default GradingResults;
