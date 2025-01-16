import React from "react";
import styled from "styled-components";
import correctIcon from "../../images/correct.png";

const ProblemList = ({ problems }) => {
  return (
    <Container>
      <ProblemListContainer>
        <h2>문제 목록</h2>
        <ul>
          {problems.map((problem) => (
            <li key={problem.id}>
              {problem.title}
              <Icon src={correctIcon} alt="correct icon" />
            </li>
          ))}
        </ul>
      </ProblemListContainer>

      <ContentArea></ContentArea>
    </Container>
  );
};

const Icon = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: middle; /* 아이콘 세로 정렬 */
  margin-left: 20px;
`;

const Container = styled.div`
  display: flex;
  margin-top: 150px; /* 여기에 상단 여백을 설정 */
`;

const ProblemListContainer = styled.div`
  position: fixed;
  top: 200px;
  left: 100px;
  width: 263px;
  height: 700px;
  background-color: #ffffff;
  border: 3px solid #5887f4;
  padding: 29px 89px;
  box-sizing: border-box;
  border-radius: 10px;

  h2 {
    font-size: 24px;
    text-align: left; /* 중앙 정렬을 왼쪽 정렬로 변경 */
    white-space: nowrap;
    margin-bottom: 44px;
  }

  ul {
    list-style-type: none;
    overflow-y: auto;
    overflow-x: hidden; /* 가로 스크롤 없애기 */
  }

  li {
    display: flex;
    align-items: center; /* 아이콘과 제목 세로 정렬 */
    font-size: 24px;
    margin-bottom: 25px;
  }
`;

const ContentArea = styled.div`
  margin-left: 100px; /* 문제 목록과 문제들 사이 간격*/
  padding: 20px;
`;

export default ProblemList;
