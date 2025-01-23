import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import character from "../images/character.png";
import sub_background from "../images/sub_background.png";
import SolveButton from "../components/SolveButton";
import { useNavigate, useLocation } from "react-router-dom";

const PracticeCompletePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { multiple_choices = [], subjectives = [] } =
    location.state?.problems || {};

  const handlePracticeClick = () => {
    // multiple_choices와 subjectives를 병합
    const combinedProblems = [
      ...multiple_choices.map((item, index) => ({
        id: `mc-${index + 1}`,
        type: "multiple_choice",
        question: item.question,
        choices: item.choices,
        correctAnswer: item.answer,
      })),
      ...subjectives.map((item, index) => ({
        id: `sa-${multiple_choices.length + index + 1}`,
        type: "short_answer",
        question: item.question,
        correctAnswer: item.answer,
      })),
    ];
    console.log("병합된 문제 데이터:", combinedProblems);

    // 병합된 데이터를 Practice 페이지로 전달
    navigate("/practice", { state: { problems: combinedProblems } });
  };

  const handleMyPageClick = () => {
    navigate("/mypage/practice");
  };

  return (
    <CompletePageWrapper>
      <Header />
      <CompleteInfoWrapper>
        <ContentContainer>
          <CharacterSection>
            <img src={character} alt="character" />
          </CharacterSection>
          <CommentBox>
            <Title>풀기 전 잠깐!</Title>
            <Comment>
              헷갈리는 문제는 더블 클릭으로 체크해두세요!
              <br />
              문제의 색상이 주황색으로 바꼈다면 체크 완료!
              <br />
              <br />
              문제를 풀고 난 후에는 오답 노트를 생성해보세요!
              <br />
              오답 노트에는 문제의 해설과 추가 이론이 작성되어있어요!
              <br />
              <br />
              오답 노트를 통해 공부하고 난 후에,
              <br />
              추가 문제를 생성해서 확실한 마무리 공부를 진행하세요~!
            </Comment>
            <Title>이제 풀어보러 가볼까요?</Title>
          </CommentBox>
        </ContentContainer>
        <ButtonSection>
          <SolveButton
            children={`지금 풀면 A+ 각.\n연습 문제 풀어보기`}
            onClick={handlePracticeClick}
          />
          <SolveButton
            children={`교수님 저는 아직 마음의 준비가 필요합니다....\n마이페이지로 이동하기`}
            onClick={handleMyPageClick}
          />
        </ButtonSection>
      </CompleteInfoWrapper>
      <Footer />
    </CompletePageWrapper>
  );
};

const CompletePageWrapper = styled.div`
  width: 100%;
  min-height: 100vh; /* 화면 높이를 100%로 설정 */
  display: flex;
  flex-direction: column;
  text-align: center;
  position: relative;
`;

const CompleteInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: contain;
  background-image: url(${sub_background});
  background-position: center; /* 배경 이미지 위치 */
  min-height: 75vh;
  width: 100%;
  gap: 5px;
  padding-top: 25px;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 800px;
`;

const CharacterSection = styled.div`
  position: absolute;
  left: -5px;
  bottom: -20px;
  z-index: 2;

  img {
    width: 200px;
    height: auto;
  }
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: white;
  border-radius: 4px;
  text-align: center;
  border: 2px solid #5887f4;
  min-height: 370px;
  width: 550px;
  padding: 15px;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 500;
`;

const Comment = styled.p`
  font-size: 20px;
  line-height: 1.2;
  text-align: left;
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 100px;
  margin-top: 40px;
`;

export default PracticeCompletePage;
