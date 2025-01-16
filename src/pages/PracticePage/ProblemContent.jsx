import React from "react";
import MultipleChoice from "./MultipleChoice";
import ShortAnswer from "./Subjective";
import ProblemList from "./ProblemList";
import styled from "styled-components";
import Header from "../../components/Header";
import Button from "../../components/SolveButton";
import Footer from "../../components/Footer"; // Footer 컴포넌트 추가

const ProblemContent = ({ problems, onButtonClick }) => {
  return (
    <>
      <Header />
      <Container>
        <ProblemList problems={problems} />
        <ContentWrapper>
          <ProblemDetail>
            {problems.map((problem) => (
              <ProblemItem key={problem.id}>
                {problem.type === "multiple_choice" && (
                  <MultipleChoice problem={problem} />
                )}
                {problem.type === "short_answer" && (
                  <ShortAnswer problem={problem} />
                )}
              </ProblemItem>
            ))}
          </ProblemDetail>
          <ButtonWrapper>
            <Button onClick={onButtonClick}>
              고생하셨습니다!
              <br />
              채점하기
            </Button>
          </ButtonWrapper>
        </ContentWrapper>
      </Container>
      <Footer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  margin-top: 100px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-left: 20px;
  margin-top: 100px;
  align-items: center; /* 가운데 정렬 */
`;

const ProblemDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: px; /* 문제 간 간격 */
`;

const ProblemItem = styled.div`
  margin-bottom: 50px;
`;

const ButtonWrapper = styled.div`
  margin-top: 50px;
`;

export default ProblemContent;
