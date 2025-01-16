import React, { useState } from "react";
import styled from "styled-components";

const ShortAnswer = ({ problem }) => {
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  const handleDoubleClick = () => {
    setIsDoubleClicked(!isDoubleClicked); // 더블클릭 시 상태 토글
  };

  return (
    <ShortAnswerContainer
      onDoubleClick={handleDoubleClick} // 더블클릭 시 상태 변경
      isDoubleClicked={isDoubleClicked} // 상태 전달
    >
      <h3>{problem.title}</h3>
      <p>{problem.content}</p>
      <input type="text" placeholder="답을 입력하세요" />
    </ShortAnswerContainer>
  );
};

const ShortAnswerContainer = styled.div`
  width: 980px;
  height: 213px;
  background-color: #ffffff;
  border: 3px solid
    ${(props) => (props.isDoubleClicked ? "#F24822" : "#5887f4")}; // 더블클릭 시 색상 변경
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  transition: border-color 0.3s ease; // 색상 변경을 부드럽게 하기 위한 트랜지션

  h3 {
    text-align: left;
    margin-top: 20px;
    margin-left: 30px;
    font-size: 24px;
  }

  p {
    text-align: left;
    margin-bottom: 20px;
    margin-left: 30px;
    font-size: 24px;
  }

  input {
    width: 850px;
    height: 40px;
    padding: 10px;
    text-align: left;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
`;

export default ShortAnswer;
