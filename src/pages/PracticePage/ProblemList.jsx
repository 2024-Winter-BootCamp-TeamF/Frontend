import React from "react";
import styled from "styled-components";

const ProblemList = ({ problems }) => {
  return (
    <Container>
      <ProblemListContainer>
        <h2>문제 목록</h2>
        <ul>
          {problems.map((problem) => (
            <li key={problem.id}>{problem.title}</li>
          ))}
        </ul>
      </ProblemListContainer>

      <ContentArea>{/* 문제 컨텐츠 추가 */}</ContentArea>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-top: 150px; /* 여기에 상단 여백을 설정 */
`;

const ProblemListContainer = styled.div`
  position: fixed;
  top: 150px; // 상단에서 150px 아래로 설정
  left: 65px; // 왼쪽에서 65px 떨어지게 설정
  width: 263px;
  height: 700px;
  background-color: #ffffff;
  border: 3px solid #5887f4;
  padding: 29px 89px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 24px;
    color: #333;
    text-align: center;
    white-space: nowrap;
  }

  ul {
    padding: 0;
    list-style-type: none;
    overflow-y: auto;
    height: 100%;
  }

  li {
    margin: 10px 0;
    font-size: 16px;
    color: #333;
  }
`;

const ContentArea = styled.div`
  margin-left: 330px; /* 문제 목록 너비만큼 여백 추가 */
  flex-grow: 1;
  padding: 20px;
`;

export default ProblemList;
