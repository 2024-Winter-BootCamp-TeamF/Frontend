import styled from "styled-components";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import WrongProblemList from "./WrongProblemList";
import ConceptExplanation from "./ConceptExplanation";
import { problems } from "../PracticePage/data";

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 85px;
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

function WrongAnswer() {
  const wrongProblems = problems.map((problem) => ({
    ...problem,
    selectedAnswer:
      problem.type === "multiple_choice" ? Math.floor(Math.random() * 5) : "",
    userAnswer:
      problem.type === "short_answer" ? "사용자가 입력한 답변입니다." : "",
  }));

  return (
    <>
      <Header />
      <PageWrapper>
        <Container>
          <LeftSection>
            <WrongProblemList problems={wrongProblems} />
          </LeftSection>
          <ConceptExplanation />
        </Container>
        <Footer />
      </PageWrapper>
    </>
  );
}

export default WrongAnswer;
