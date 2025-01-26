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
  const [doubleClickedProblems, setDoubleClickedProblems] = useState(
    location.state?.doubleClickedProblems || []
  );
  const [confusedAnswers, setConfusedAnswers] = useState([]);

  // API 호출 (필요한 경우)
  useEffect(() => {
    const fetchWrongAnswers = async () => {
      try {
        const response = await axiosInstance.get(
          "/question/incorrect-answers/"
        );
        setResponses(response.data); // API 응답 데이터 저장
      } catch (error) {
        console.error("오답 조회 데이터 가져오기 오류:", error);
      }
    };

    if (responses.length === 0) {
      fetchWrongAnswers(); // 전달받은 데이터가 없을 경우 API 호출
    }
  }, [responses]);

  // 선택된 응답 정보가 있을 경우 상태 업데이트
  useEffect(() => {
    if (location.state?.selectedResponse) {
      setResponses([location.state.selectedResponse]); // 선택된 응답 정보로 상태 업데이트
    }
  }, [location.state?.selectedResponse]);

  // doubleClickedProblems를 사용하여 필요한 로직 추가
  useEffect(() => {
    if (doubleClickedProblems.length > 0) {
      console.log("더블 클릭된 문제 번호:", doubleClickedProblems);
      // 추가 로직을 여기에 작성
    }
  }, [doubleClickedProblems]);

  // 더블 클릭된 문제에 대한 해설 가져오기
  useEffect(() => {
    const fetchConfusedAnswers = async () => {
      if (doubleClickedProblems.length === 0) return; // 더블 클릭된 문제가 없으면 종료

      try {
        const answers = await Promise.all(
          doubleClickedProblems.map(async (problemId) => {
            const response = await axiosInstance.post(
              "/question/confused-answers/",
              {
                question_id: problemId, // 요청 형식에 맞게 question_id 전달
              }
            );
            console.log("API 응답:", response.data); // API 응답 메시지 출력
            return response.data; // API 응답 데이터 반환
          })
        );
        setConfusedAnswers(answers); // 해설 상태 업데이트
      } catch (error) {
        console.error(
          "해설 가져오기 오류:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchConfusedAnswers(); // 함수 호출
  }, [doubleClickedProblems]); // doubleClickedProblems가 변경될 때마다 호출

  const handleAddButtonClick = () => {
    navigate("/AddComplete");
  };

  const handleUserButtonClick = () => {
    navigate("/mypage/summary");
  };

  return (
    <WrongAnswerWrapper>
      <Header />
      <GridContainer>
        {responses.map((response) =>
          response.is_correct && !response.isDoubleClicked ? null : (
            <>
              <QuizCard
                key={`problem-${response.question_id}`}
                style={{
                  borderColor: response.isDoubleClicked ? "#F24822" : "#5887f4", // 더블 클릭된 경우 주황색 테두리
                }}
              >
                <Question>
                  <Title>
                    Q.
                    {(response.question_id + 6) % 10 === 0
                      ? 10
                      : (response.question_id + 6) % 10}
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
              <ExplanationCard
                key={`explanation-${response.question_id}`}
                style={{
                  borderColor: response.isDoubleClicked ? "#F24822" : "#5887f4", // 더블 클릭된 경우 주황색 테두리
                }}
              >
                <Title>해설</Title>
                <div>정답: {response.correct_answer}</div>
                <hr />
                {response.isDoubleClicked ? (
                  <ExplanationText>
                    {confusedAnswers.find(
                      (answer) => answer.question_id === response.question_id
                    )?.explanation || "해설이 제공되지 않았습니다."}
                  </ExplanationText>
                ) : response.explanation ? (
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
