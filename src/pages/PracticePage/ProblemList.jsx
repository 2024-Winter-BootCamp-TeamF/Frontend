import React from "react";
import styled from "styled-components";

const ProblemList = ({ problems }) => {
  return (
    <ProblemListContainer>
      <h2>문제 목록</h2>
      <ul>
        {problems.map((problem) => (
          <li key={problem.id}>{problem.title}</li>
        ))}
      </ul>
    </ProblemListContainer>
  );
};

const ProblemListContainer = styled.div`
  width: 263px;
  height: 700px;
  background-color: #ffffff;
  border: 2px solid #5887f4;
  padding: 29px 89px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: 65px;
  margin-top: 150px;

  h2 {
    font-size: 24px;
    color: #333;
    text-align: center;
    white-space: nowrap;
  }

  li {
    margin: 10px 0;
    font-size: 16px;
    color: #333;
  }
`;

export default ProblemList;
