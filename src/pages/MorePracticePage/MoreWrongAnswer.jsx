import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SolveButton from "../../components/SolveButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MoreWrongAnswer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [responses, setResponses] = useState(location.state?.problems || []);

  // API 호출 (필요한 경우)
  useEffect(() => {
    const fetchWrongAnswers = async () => {
      try {
        const response = await axiosInstance.get("/morequestion/submit-answer");
        setResponses(response.data); // API 응답 데이터 저장
      } catch (error) {
        console.error("오답 조회 데이터 가져오기 오류:", error);
      }
    };

    if (responses.length === 0) {
      fetchWrongAnswers(); // 전달받은 데이터가 없을 경우 API 호출
    }
  }, [responses]);

  const handlePageButtonClick = () => {
    navigate("/mypage/note");
  };

  const handleDataDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // 토큰 가져오기
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await axios.delete(
        "http://localhost:8000/api/langchain/delete",
        {
          headers: {
            Authorization: `Token ${token}`, // 헤더에 토큰 추가
          },
        }
      );

      if (response.status === 202) {
        console.log("데이터 삭제 성공");
      } else {
        console.log("데이터 삭제 실패");
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      alert("API 호출 중 문제가 발생했습니다.");
    }
  };

  return (
    <WrongAnswerWrapper>
      <Header />
      <GridContainer>
        {responses.map((response) =>
          response.is_correct ? null : (
            <>
              <QuizCard key={`problem-${response.question_id}`}>
                <Question>
                  <Title>문제</Title>
                  <QuestionText>{response.question}</QuestionText>
                  <AnswerText>
                    {response.question_type === "객관식" ? (
                      <>
                        <div>선택한 답: {response.user_answer}</div>
                        <div style={{ marginTop: "10px" }}>
                          {Array.isArray(response.choices)
                            ? response.choices.map((choice, index) => (
                                <div key={index} style={{ marginLeft: "20px" }}>
                                  {index + 1}. {choice}
                                  {index < response.choices.length - 1
                                    ? " "
                                    : ""}
                                </div>
                              ))
                            : response.choices
                                .split("")
                                .map((choice, index) => (
                                  <div
                                    key={index}
                                    style={{ marginLeft: "20px" }}
                                  >
                                    {index + 1}. {choice}
                                    {index < response.choices.length - 1
                                      ? ", "
                                      : ""}
                                  </div>
                                ))}
                        </div>
                      </>
                    ) : (
                      `사용자가 입력한 답: ${response.user_answer}`
                    )}
                  </AnswerText>
                </Question>
              </QuizCard>
              <ExplanationCard key={`explanation-${response.question_id}`}>
                <Title>해설</Title>
                <div>정답: {response.correct_answer}</div>
                <hr />
                {response.explanation ? (
                  <ExplanationText>{response.explanation}</ExplanationText>
                ) : (
                  <ExplanationText>해설이 제공되지 않았습니다.</ExplanationText>
                )}
              </ExplanationCard>
            </>
          )
        )}
      </GridContainer>
      <ButtonWrapper>
        <SolveButton
          onClick={() => {
            handlePageButtonClick();
            handleDataDelete();
          }}
          children={"이제는 계속해서 복습하자!\n마이페이지로 이동하기"}
        />
      </ButtonWrapper>
      <Footer />
    </WrongAnswerWrapper>
  );
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin-top: 50px;
`;

const QuizCard = styled.div`
  background: white;
  border: 2px solid #5887f4;
  border-radius: 10px;
  padding: 30px;
`;

const Question = styled.div`
  margin-bottom: 20px;
`;

const QuestionText = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const AnswerText = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

const ExplanationCard = styled.div`
  background: white;
  border: 2px solid #5887f4;
  border-radius: 10px;
  padding: 30px;
  position: relative;
`;

const ExplanationText = styled.p`
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.6;
`;

const WrongAnswerWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  padding: 70px;
`;

export default MoreWrongAnswer;
