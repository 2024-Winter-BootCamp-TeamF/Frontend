import React from "react";
import MultipleChoice from "./MultipleChoice";
import ShortAnswer from "./Subjective";
import ProblemList from "./ProblemList";
import styled from "styled-components";

const ProblemContent = ({ problems }) => {
  return (
    <Container>
      <ProblemList problems={problems} />
      <ProblemDetail>
        {problems.map((problem) => {
          return (
            <ProblemItem key={problem.id}>
              {problem.type === "multiple_choice" && (
                <MultipleChoice problem={problem} />
              )}
              {problem.type === "short_answer" && (
                <ShortAnswer problem={problem} />
              )}
            </ProblemItem>
          );
        })}
      </ProblemDetail>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-top: 100px;
`;

const ProblemDetail = styled.div`
  padding-left: 20px;
  margin-top: 50px;
`;

const ProblemItem = styled.div`
  margin-bottom: 40px;
`;

export default ProblemContent;
