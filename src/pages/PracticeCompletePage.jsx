import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import character from "../images/character.png";
import sub_background from "../images/sub_background.png";
import SolveButton from "../components/SolveButton";

const PracticeCompletePage = () => {
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
            onClick={() => {
              /* 문제 풀기 페이지로 이동 */
            }}
          />
          <SolveButton
            children={`교수님 저는 아직 마음의 준비가 필요합니다....\n마이페이지에 저장하기`}
            variant="outlined"
            onClick={() => {
              /* 마이페이지로 이동 */
            }}
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
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CompleteInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: contain;
  background-image: url(${sub_background});
  background-position: center; /* 배경 이미지 위치 */
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 800px;
  margin-bottom: 40px;
`;

const CharacterSection = styled.div`
  position: absolute;
  left: -40px;
  bottom: -50px;
  z-index: 2;

  img {
    width: 250px;
    height: auto;
  }
`;

const CommentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background: white;
  border-radius: 4px;
  text-align: center;
  border: 2px solid #5887f4;
  min-height: 400px;
  width: 600px;
  padding: 15px;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
`;

const Comment = styled.p`
  font-size: 20px;
  line-height: 1.2;
  text-align: l.2;
`;

const ButtonSection = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 40px;
`;

export default PracticeCompletePage;
