import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import character from "../images/character.png";
import sub_background from "../images/sub_background.png";
import SolveButton from "../components/SolveButton";

const CheckCompletePage = () => {
  return (
    <CompletePageWrapper>
      <Header />
      <CompleteInfoWrapper>
        <CharacterSection>
          <img src={character} alt="character" />
        </CharacterSection>
        <CommentSection>
          {`채점이 완료되었습니다!\n결과를 확인해보세요!`
            .split("\n")
            .map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
        </CommentSection>
        <ButtonSection>
          <SolveButton children={`과연 나의 학습 결과는?!\n결과 확인하기`} />
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
  position: relative;
`;

const CompleteInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-size: cover;
  background-image: url(${sub_background});
  background-position: center; /* 배경 이미지 위치 */
  height: 100%;
  width: 100%;
  gap: 30px;
`;

const CharacterSection = styled.div`
  padding-top: 20px;
  img {
    width: 270px;
    height: auto;
  }
`;

const CommentSection = styled.div`
  font-size: 30px;
  padding-bottom: 30px;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
`;

export default CheckCompletePage;
