import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styled from "styled-components";
import WrongProblemList from "./WrongProblemList";
import ConceptExplanation from "./ConceptExplanation";
import { problems } from "../PracticePage/data";

const WrongAnswer = () => {
  const wrongProblems = problems.map((problem) => ({
    ...problem,
    selectedAnswer:
      problem.type === "multiple_choice" ? Math.floor(Math.random() * 5) : "",
    userAnswer:
      problem.type === "short_answer" ? "사용자가 입력한 답변입니다." : "",
  }));

  return (
    <WrongAnswerWrapper>
      <Header />
      <Container>
        <LeftSection>
          <WrongProblemList problems={wrongProblems} />
        </LeftSection>
        <ConceptExplanation />
      </Container>
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

export default WrongAnswer;
