import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styled from "styled-components";
import WrongProblemList from "./WrongProblemList";
import ConceptExplanation from "./ConceptExplanation";
import { problems } from "../PracticePage/data";
import { useNavigate } from "react-router-dom";
import SolveButton from "../../components/SolveButton";

const WrongAnswer = () => {
  const wrongProblems = problems.map((problem) => ({
    ...problem,
    selectedAnswer:
      problem.type === "multiple_choice" ? Math.floor(Math.random() * 5) : "",
    userAnswer:
      problem.type === "short_answer" ? "사용자가 입력한 답변입니다." : "",
  }));

  const navigate = useNavigate();

  const handleAddPracButtonClick = () => {
    navigate("/Addcomplete");
  };

  const handleMyPageButtonClick = () => {
    navigate("/mypage/summary");
  };

  return (
    <WrongAnswerWrapper>
      <Header />
      <Container>
        <LeftSection>
          <WrongProblemList problems={wrongProblems} />
        </LeftSection>
        <ConceptExplanation />
      </Container>
      <ButtonWrapper>
        <SolveButton
          variant="filled"
          onClick={handleAddPracButtonClick}
          children={
            "한숨 쉴 시간에 한 문제라도 더 풀자!\n추가 연습 문제 생성하기"
          }
        />
        <SolveButton
          onClick={handleMyPageButtonClick}
          children={
            "많이 틀렸어도 기죽지 말자! 앞으로도 화이팅!\n마이페이지로 이동하기"
          }
        />
      </ButtonWrapper>
      <Footer />
    </WrongAnswerWrapper>
  );
};

const WrongAnswerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 0;
  padding: 2rem 0;
  flex: 1;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    margin-bottom: 50px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px 0 50px 0;
  gap: 100px;
`;

export default WrongAnswer;
