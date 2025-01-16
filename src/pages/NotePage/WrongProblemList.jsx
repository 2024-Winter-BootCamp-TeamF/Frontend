import React from "react";
import styled from "styled-components";
import MultipleChoice from "../PracticePage/MultipleChoice";
import Button from "../../components/SolveButton";

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
      <ButtonWrapper>
        <Button>
          많이 틀렸어도 기죽지 말자! <br />
          앞으로도 화이팅!
        </Button>
      </ButtonWrapper>
    </Container>
  );
};

const ProblemListContainer = styled.div`
  margin-left: 60px;
`;

const ReadOnlyWrapper = styled.div`
  pointer-events: none;
  margin-bottom: 50px;
  margin-right: 30px;
  margin-top: ${(props) => (props.isFirst ? "70px" : "0")};

  > div {
    width: 100%;
    height: 442px !important;
  }
`;

const SubjectiveWrapper = styled.div`
  margin-bottom: 50px;
  margin-right: 30px;
  margin-top: ${(props) => (props.isFirst ? "70px" : "0")};
`;

const ReadOnlySubjective = styled.div`
  width: 100%;
  height: 442px;
  background-color: #ffffff;
  border: 3px solid #5887f4;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 10px;
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
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0;
`;

export default WrongProblemList;
