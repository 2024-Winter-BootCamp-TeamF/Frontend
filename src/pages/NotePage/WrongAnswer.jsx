import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SolveButton from "../../components/SolveButton";
import { useNavigate } from "react-router-dom";

function WrongAnswer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [responses, setResponses] = useState(location.state?.problems || []);

  // API 호출 (필요한 경우)
  useEffect(() => {
    const fetchWrongAnswers = async () => {
      try {
        const response = await axiosInstance.get("/question/submit-answer/");
        setResponses(response.data); // API 응답 데이터 저장
      } catch (error) {
        console.error("오답 조회 데이터 가져오기 오류:", error);
      }
    };

    if (responses.length === 0) {
      fetchWrongAnswers(); // 전달받은 데이터가 없을 경우 API 호출
    }
  }, [responses]);

  const handleAddButtonClick = () => {
    navigate("/AddComplete");
  };

  const handleUserButtonClick = () => {
    navigate("/mypage/summary");
  };

  const handleDownload = (explanation) => {
    const blob = new Blob([explanation || "부가 설명이 없습니다."], {
      type: "text/plain",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "explanation.txt";
    link.click();
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
                  <Title>
                    Q.
                    {response.question_id % 10 === 0
                      ? 10
                      : response.question_id % 10}
                  </Title>
                  <QuestionText>{response.question_text}</QuestionText>
                  <AnswerText>
                    {response.question_type === "객관식" ? (
                      <>
                        <div>선택한 답: {response.user_answer}</div>
                        <div style={{ marginTop: "10px" }}>
                          {Array.isArray(response.choices)
                            ? response.choices.map((choice, index) => (
                                <span key={index}>
                                  {index + 1}. {choice}
                                  {index < response.choices.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              ))
                            : response.choices
                                .split("")
                                .map((choice, index) => (
                                  <span key={index}>
                                    {index + 1}. {choice}
                                    {index < response.choices.length - 1
                                      ? ", "
                                      : ""}
                                  </span>
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
                {response.explanation ? (
                  <ExplanationText>{response.explanation}</ExplanationText>
                ) : (
                  <ExplanationText>해설이 제공되지 않았습니다.</ExplanationText>
                )}
                <DownloadButton
                  onClick={() => handleDownload(response.explanation)}
                >
                  부가 설명 다운로드
                </DownloadButton>
              </ExplanationCard>
            </>
          )
        )}
      </GridContainer>
      <ButtonWrapper>
        <SolveButton
          onClick={handleUserButtonClick}
          children={
            "많이 틀렸어도 기죽지 말자! 앞으로도 화이팅!\n마이페이지로 이동하기"
          }
        />
        <SolveButton
          onClick={handleAddButtonClick}
          children={
            "한숨 쉴 시간에 한 문제라도 더 풀자.\n추가 연습 문제 생성하기"
          }
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
`;

const DownloadButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  background-color: #5887f4;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  bottom: 12px;
  right: 12px;
  font-family: "HakgyoansimAllimjangTTF-R";
  font-size: 16px;

  &:hover {
    background-color: #fff;
    color: #5887f4;
    border: 1px solid #5887f4;
    transition: all 0.1s ease;
  }
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

export default WrongAnswer;
