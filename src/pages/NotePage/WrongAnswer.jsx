import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SolveButton from "../../components/SolveButton";
import axios from "axios";

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
  const [isApiCalled, setIsApiCalled] = useState(false); // API 호출 여부 상태 추가
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

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
              "/question/confused-answers",
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
  }, [doubleClickedProblems, responses]);

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
      setIsNewNote(false);
    }
  }; // 중복된 노트가 있을 경우 상태를 false로 설정
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

      // 각 문제에 is_answer 필드 추가
      const updatedQuestions = generatedQuestions.map((question) => ({
        ...question,
        is_answer: 0, // 기본값으로 0 (채점되지 않음)
      }));

      const firstTopic = generatedQuestions[0]?.topic || "추가 연습 문제";

      // 템플릿으로 변환 후 로컬스토리지에 저장
      const template = {
        id: new Date().toISOString(), // 고유 ID 생성
        title: `${firstTopic}_추가 연습 문제`, // 첫 번째 문제의 topic 활용
        questions: updatedQuestions,
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

  // 컴포넌트가 처음 렌더링될 때 기존 노트가 있는지 확인
  useEffect(() => {
    const existingNotes = JSON.parse(localStorage.getItem("wrongNotes")) || [];
    const noteTitle = `${location.state?.firstTopic || "오답"}_오답노트`;

    // 기존 노트가 있는 경우 상태 업데이트
    const isExistingNote = existingNotes.some(
      (note) => note.title === noteTitle
    );

    setIsNewNote(!isExistingNote); // 기존 노트가 없으면 true, 있으면 false
  }, [location.state?.firstTopic]);

  // 노트 저장 함수
  const saveNote = (topics, problems, confusedAnswers) => {
    const noteTitle = `${location.state?.firstTopic || "오답"}_오답노트`;

    const newNote = {
      id: Date.now(),
      title: noteTitle,
      date: new Date().toISOString(),
      topics,
      problems,
      confusedAnswers,
    };

    const existingNotes = JSON.parse(localStorage.getItem("wrongNotes")) || [];
    localStorage.setItem(
      "wrongNotes",
      JSON.stringify([...existingNotes, newNote])
    );

    console.log(
      "현재 저장된 모든 노트:",
      JSON.parse(localStorage.getItem("wrongNotes"))
    );
  };

  // API 호출 함수
  const fetchData = async () => {
    try {
      // API 호출 로직
      // 예: const response = await axiosInstance.get("/your-api-endpoint");
      setIsApiCalled(true); // API 호출이 완료되면 상태 업데이트
    } catch (error) {
      console.error("API 호출 오류:", error);
    }
  };

  useEffect(() => {
    fetchData(); // 컴포넌트가 마운트될 때 API 호출
  }, []);

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
          onClick={() => {
            navigate("/mypage/note"); // 마이페이지/노트로 이동
            handleUserButtonClick(); // 추가 함수 실행
            handleDataDelete();
          }}
          children={
            "많이 틀렸어도 기죽지 말자! 앞으로도 화이팅!\n마이페이지로 이동하기"
          }
        />
        <SolveButton
          onClick={() => {
            handleAddButtonClick(); // 추가 연습 문제 생성
            handleUserButtonClick(); // 추가 함수 실행
          }}
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
