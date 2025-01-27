import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import character from "../images/character.png";
import sub_background from "../images/sub_background.png";
import SolveButton from "../components/SolveButton";
import { useNavigate } from "react-router-dom";

const PracticeCompletePage = () => {
  const navigate = useNavigate();

  const handleMyPageClick = () => {
    navigate("/mypage/practice");
  };

  return (
    <CompletePageWrapper>
      <Header />
      <CompleteInfoWrapper>
        <ContentContainer>
          <CharacterSection>
            <img src={character} alt="character" />
          </CharacterSection>
          <CommentBox>
            <Title>풀기 전 잠깐!</Title>
            <Comment>
              헷갈리는 문제는 더블 클릭으로 체크해두세요!
              <br />
              문제의 색상이 주황색으로 바꼈다면 체크 완료!
              <br />
              <br />
              문제를 풀고 난 후에는 오답 노트를 생성해보세요!
              <br />
              오답 노트에는 문제의 해설과 추가 이론이 작성되어있어요!
              <br />
              <br />
              오답 노트를 통해 공부하고 난 후에,
              <br />
              추가 문제를 생성해서 확실한 마무리 공부를 진행하세요~!
            </Comment>
            <Title>이제 풀어보러 가볼까요?</Title>
          </CommentBox>
        </ContentContainer>
        <ButtonSection>
          <SolveButton
            children={`마이페이지에서 생성된 연습 문제를 풀어보세요!\n마이페이지로 이동하기`}
            onClick={handleMyPageClick}
          />
        </ButtonSection>
      </CompleteInfoWrapper>
      <Footer />
    </CompletePageWrapper>
  );
};

const LoadingModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CompletePageWrapper = styled.div`
  width: 100%;
  min-height: 100vh; /* 화면 높이를 100%로 설정 */
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
`;

const CompleteInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: contain;
  background-image: url(${sub_background});
  background-position: center; /* 배경 이미지 위치 */
  min-height: 75vh;
  width: 100%;
  gap: 5px;
  padding-top: 25px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 800px;
`;

const CharacterSection = styled.div`
  position: absolute;
  left: -5px;
  bottom: -20px;
  z-index: 2;

  img {
    width: 200px;
    height: auto;
  }
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 4px;
  text-align: center;
  border: 2px solid #5887f4;
  min-height: 370px;
  width: 550px;
  padding: 15px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;

const Comment = styled.p`
  font-size: 20px;
  line-height: 1.2;
  text-align: left;
`;

const ButtonSection = styled.div`
  display: flex;
  margin-top: 40px;
`;

export default PracticeCompletePage;
