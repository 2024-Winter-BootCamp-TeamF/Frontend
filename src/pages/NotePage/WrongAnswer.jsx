import { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SolveButton from "../../components/SolveButton";
import { useNavigate } from "react-router-dom";

function WrongAnswer() {
  const navigate = useNavigate();

  // State for storing API response data
  const [responses, setResponses] = useState([]);

  // Mock API call (replace with actual API integration)
  useEffect(() => {
    // Example response from the grading API
    const mockApiResponse = [
      {
        question_id: 27,
        question: "27번 문제 작성 예정",
        question_type: "주관식",
        user_answer:
          "디지털 시스템에서 정보를 나타내기 위해 사용되는 코드로, 일정한 비트 패턴이 특정한 정보나 기호를 나타내는 방식.",
        correct_answer:
          "디지털 시스템에서 정보를 나타내기 위해 사용되는 코드로, 일정한 비트 패턴이 특정한 정보나 기호를 나타내는 방식입니다.",
        is_correct: false,
        explanation: null,
      },
      {
        question_id: 28,
        question: "28번 문제 작성 예정",
        question_type: "객관식",
        user_answer: 1,
        correct_answer: 3,
        is_correct: false,
        explanation: "객관식 문제의 정답은 3번입니다.",
      },
      {
        question_id: 27,
        question: "27번 문제 작성 예정",
        question_type: "주관식",
        user_answer:
          "디지털 시스템에서 정보를 나타내기 위해 사용되는 코드로, 일정한 비트 패턴이 특정한 정보나 기호를 나타내는 방식.",
        correct_answer:
          "디지털 시스템에서 정보를 나타내기 위해 사용되는 코드로, 일정한 비트 패턴이 특정한 정보나 기호를 나타내는 방식입니다.",
        is_correct: false,
        explanation: null,
      },
      {
        question_id: 27,
        question: "27번 문제 작성 예정",
        question_type: "주관식",
        user_answer:
          "디지털 시스템에서 정보를 나타내기 위해 사용되는 코드로, 일정한 비트 패턴이 특정한 정보나 기호를 나타내는 방식.",
        correct_answer:
          "디지털 시스템에서 정보를 나타내기 위해 사용되는 코드로, 일정한 비트 패턴이 특정한 정보나 기호를 나타내는 방식입니다.",
        is_correct: false,
        explanation: null,
      },
      {
        question_id: 27,
        question: "27번 문제 작성 예정",
        question_type: "주관식",
        user_answer:
          "디지털 시스템에서 정보를 나타내기 위해 사용되는 코드로, 일정한 비트 패턴이 특정한 정보나 기호를 나타내는 방식.",
        correct_answer:
          "디지털 시스템에서 정보를 나타내기 위해 사용되는 코드로, 일정한 비트 패턴이 특정한 정보나 기호를 나타내는 방식입니다.",
        is_correct: false,
        explanation: null,
      },
      {
        question_id: 27,
        question: "27번 문제 작성 예정",
        question_type: "주관식",
        user_answer:
          "디지털 시스템에서 정보를 나타내기 위해 사용되는 코드로, 일정한 비트 패턴이 특정한 정보나 기호를 나타내는 방식.",
        correct_answer:
          "디지털 시스템에서 정보를 나타내기 위해 사용되는 코드로, 일정한 비트 패턴이 특정한 정보나 기호를 나타내는 방식입니다.",
        is_correct: false,
        explanation: null,
      },
    ];

    setResponses(mockApiResponse);
  }, []);

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
        {responses.map((response) => (
          <>
            <QuizCard key={`problem-${response.question_id}`}>
              <Question>
                <Title>Q.{response.question_id}</Title>
                <QuestionText>{response.question}</QuestionText>
                <AnswerText>
                  {response.question_type === "객관식"
                    ? `사용자가 선택한 답: ${response.user_answer}번`
                    : `사용자가 입력한 답: ${response.user_answer}`}
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
        ))}
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
