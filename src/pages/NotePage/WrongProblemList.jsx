import React from "react";
import styled from "styled-components";
import MultipleChoice from "../PracticePage/MultipleChoice";

const WrongProblemList = ({ problems }) => {



  const renderProblem = (problem) => {
    if (problem.type === "multiple_choice") {
      return (
        <ReadOnlyWrapper key={problem.id} isFirst={problem.id === 1}>
          <MultipleChoice
            problem={{
              ...problem,
              id: `problem-${problem.id}`,
            }}
            readOnly={true}
          />
        </ReadOnlyWrapper>
      );
    } else {
      return (
        <SubjectiveWrapper key={problem.id} isFirst={problem.id === 1}>
          <ReadOnlySubjective>
            <Title>{problem.title}</Title>
            <Content>{problem.content}</Content>
            <AnswerInput value={problem.userAnswer} disabled />
          </ReadOnlySubjective>
        </SubjectiveWrapper>
      );
    }
  };

  return (
    <Container>
      <ProblemListContainer>{problems.map(renderProblem)}</ProblemListContainer>
    </Container>
  );
};

const ProblemListContainer = styled.div`
  margin-left: 60px;
  @media screen and (max-width: 1200px) {
    margin-left: 20px;
  }
`;

const ReadOnlyWrapper = styled.div`
  pointer-events: none;
  margin-bottom: 50px;
  margin-right: 30px;

  > div {
    width: 100%;
    min-height: 442px;
    height: auto !important;
  }

  @media screen and (max-width: 1200px) {
    margin-right: 20px;
  }
`;

const SubjectiveWrapper = styled.div`
  margin-bottom: 50px;
  margin-right: 30px;
  margin-top: ${(props) => (props.isFirst ? "100px" : "0")};

  @media screen and (max-width: 1200px) {
    margin-right: 20px;
  }
`;

const ReadOnlySubjective = styled.div`
  width: 100%;
  min-height: 442px;
  height: auto;
  background-color: #ffffff;
  border: 3px solid #5887f4;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;

  @media screen and (max-width: 1200px) {
    padding: 15px;
  }
`;

const Title = styled.h3`
  color: #121111;
  font-size: 24px;
  margin: 30px 0 0 30px;
  text-align: left;
`;

const Content = styled.p`
  font-size: 24px;
  margin: 0;
  padding: 0 0 30px 30px;
  text-align: left;
`;

const AnswerInput = styled.input`
  width: 100%;
  height: 40px;
  padding: 10px;
  text-align: left;
  font-size: 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background-color: #ffffff;
  color: #495057;
  cursor: not-allowed;

  &:disabled {
    opacity: 1;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
`;


export default WrongProblemList;
