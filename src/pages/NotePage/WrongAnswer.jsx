import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SolveButton from "../../components/SolveButton";

function WrongAnswer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [responses, setResponses] = useState(location.state?.problems || []);
  const [doubleClickedProblems] = useState(
    location.state?.doubleClickedProblems || []
  );
  const [confusedAnswers, setConfusedAnswers] = useState(
    location.state?.problems || []
  );
  const [isNewNote, setIsNewNote] = useState(false); // 새로운 노트 상태 추가

  // API 호출 (필요한 경우)
  // 오답 API 호출
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
              { question_id: problemId }
            );
            console.log("API 응답:", response.data);
            return response.data;
          })
        );
        setConfusedAnswers(answers);

        // responses의 explanation 업데이트
        const updatedResponses = responses.map((response) => {
          const confusedAnswer = answers.find(
            (answer) => answer.question_text === response.question_text
          );
          if (response.explanation === null && confusedAnswer) {
            return {
              ...response,
              explanation:
                confusedAnswer.explanation || "해설이 제공되지 않았습니다.",
            };
          }
          return response;
        });

        setResponses(updatedResponses); // 업데이트된 responses 상태 저장
      } catch (error) {
        console.error(
          "해설 가져오기 오류:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchConfusedAnswers();
  }, [doubleClickedProblems]);

  const saveNote = (topics, problems, confusedAnswers) => {
    const noteTitle = `${location.state?.firstTopic || "오답"}_오답노트`;
    const existingNotes = JSON.parse(localStorage.getItem("wrongNotes")) || [];

    // 중복 노트 확인
    const isDuplicate = existingNotes.some(
      (note) =>
        note.title === noteTitle &&
        JSON.stringify(note.problems) === JSON.stringify(problems) &&
        JSON.stringify(note.confusedAnswers) === JSON.stringify(confusedAnswers)
    );

    if (isDuplicate) {
      console.log("중복된 노트가 이미 존재합니다.");
      return; // 중복된 노트가 있으면 저장하지 않음
    }

    const newNote = {
      id: Date.now(),
      title: noteTitle,
      date: new Date().toISOString(),
      topics,
      problems,
      confusedAnswers,
    };

    console.log("새로 저장되는 노트 데이터:", newNote);
    localStorage.setItem(
      "wrongNotes",
      JSON.stringify([...existingNotes, newNote])
    );
    console.log(
      "현재 저장된 모든 노트:",
      JSON.parse(localStorage.getItem("wrongNotes"))
    );
  };

  const handleUserButtonClick = () => {
    const noteTitle = `${location.state?.firstTopic || "오답"}_오답노트`;
    const existingNotes = JSON.parse(localStorage.getItem("wrongNotes")) || [];

    // 중복 노트 확인
    const isDuplicate = existingNotes.some(
      (note) =>
        note.title === noteTitle &&
        JSON.stringify(note.problems) === JSON.stringify(responses) &&
        JSON.stringify(note.confusedAnswers) === JSON.stringify(confusedAnswers)
    );

    if (!isDuplicate) {
      saveNote([location.state?.firstTopic], responses, confusedAnswers); // 새로운 노트 생성
      setIsNewNote(true); // 새로운 노트 생성 시 상태 업데이트
    } else {
      console.log("중복된 노트가 이미 존재합니다.");
      setIsNewNote(false); // 중복된 노트가 있을 경우 상태를 false로 설정
    }

    // 마이페이지로 이동
    navigate("/mypage/note");
  };

  // 컴포넌트가 처음 렌더링될 때 기존 노트가 있는지 확인
  useEffect(() => {
    const existingNotes = JSON.parse(localStorage.getItem("wrongNotes")) || [];
    const noteTitle = `${location.state?.firstTopic || "오답"}_오답노트`;

    // 기존 노트가 있는 경우 상태 업데이트
    const isExistingNote = existingNotes.some(
      (note) => note.title === noteTitle
    );

    setIsNewNote(!isExistingNote); // 기존 노트가 없으면 true, 있으면 false
  }, []);

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
                  <Title>문제</Title>
                  <QuestionText>{response.question_text}</QuestionText>
                  <AnswerText>
                    {response.question_type === "객관식" ? (
                      <>
                        <div style={{ marginBottom: "20px" }}>
                          선택한 답: {response.user_answer}
                        </div>

                        {Array.isArray(response.choices)
                          ? response.choices.map((choice, index) => (
                              <div key={index} style={{ marginLeft: "20px" }}>
                                {index + 1}. {choice}
                              </div>
                            ))
                          : response.choices.split("").map((choice, index) => (
                              <div key={index} style={{ marginLeft: "10px" }}>
                                {index + 1}. {choice}
                              </div>
                            ))}
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
                <ExplanationText>
                  {response.explanation ? (
                    <ExplanationText>{response.explanation}</ExplanationText>
                  ) : response.isDoubleClicked ? (
                    confusedAnswers.find(
                      (answer) =>
                        answer.question_text === response.question_text
                    )?.explanation || "해설이 제공되지 않았습니다."
                  ) : (
                    <ExplanationText>
                      해설이 제공되지 않았습니다.
                    </ExplanationText>
                  )}
                </ExplanationText>
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
          onClick={() => {
            /* 추가 연습 문제 풀어보기 로직 */
          }}
          disabled={!isNewNote} // 새로운 노트가 생성된 경우에만 활성화
          children={"지금이라면 다 맞을 수 있어.\n추가 연습 문제 풀어보기"}
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
