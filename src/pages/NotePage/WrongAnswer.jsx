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
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  // API 호출 (필요한 경우)
  useEffect(() => {
    const fetchWrongAnswers = async () => {
      try {
        const response = await axiosInstance.get("/question/submit-answer");
        setResponses(response.data); // API 응답 데이터 저장
      } catch (error) {
        console.error("오답 조회 데이터 가져오기 오류:", error);
      }
    };

    if (responses.length === 0) {
      fetchWrongAnswers(); // 전달받은 데이터가 없을 경우 API 호출
    }
  }, [responses]);

  const handleAddButtonClick = async () => {
    try {
      // 로컬 스토리지에서 토큰 가져오기
      const token = localStorage.getItem("accessToken");

      if (!token) {
        alert("인증 토큰이 없습니다. 다시 로그인해주세요.");
        navigate("/login"); // 로그인 페이지로 이동
        return;
      }

      setIsLoading(true); // 로딩 시작

      // API 호출
      const response = await axiosInstance.post(
        "/morequestion/create",
        {
          incorrect_question_ids: responses
            .filter((response) => !response.is_correct)
            .map((response) => response.question_id),
        },
        {
          headers: {
            Authorization: `Token ${token}`, // 헤더에 토큰 추가
          },
        }
      );

      const generatedQuestions = response.data.generated_multiple_choices;
      const firstTopic = generatedQuestions[0]?.topic || "추가 연습 문제";

      // 템플릿으로 변환 후 로컬스토리지에 저장
      const template = {
        id: new Date().toISOString(), // 고유 ID 생성
        title: `${firstTopic}_추가 연습 문제`, // 첫 번째 문제의 topic 활용
        questions: generatedQuestions,
      };

      const existingTemplates =
        JSON.parse(localStorage.getItem("practiceTemplates")) || [];
      localStorage.setItem(
        "practiceTemplates",
        JSON.stringify([...existingTemplates, template])
      );

      navigate("/addcomplete"); // 성공 시 AddComplete 페이지로 이동
    } catch (error) {
      console.error("추가 연습 문제 생성 오류:", error);
      alert("추가 연습 문제 생성에 실패했습니다.");
    } finally {
      setIsLoading(false); // 로딩 종료
    }
  };

  const handlePageButtonClick = () => {
    navigate("/mypage/note");
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
                                    ? " "
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
              </ExplanationCard>
            </>
          )
        )}
      </GridContainer>
      <ButtonWrapper>
        <SolveButton
          onClick={handlePageButtonClick}
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
      {isLoading && (
        <LoadingModal>
          <LoadingContent>
            <LoadingSpinner />
            <LoadingText>
              추가 연습 문제를 생성 중입니다. 잠시만 기다려주세요...
            </LoadingText>
          </LoadingContent>
        </LoadingModal>
      )}
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

const LoadingModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #5887f4;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: #333;
  font-size: 24px;
`;

export default WrongAnswer;
