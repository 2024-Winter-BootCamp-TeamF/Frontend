import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import character from "../images/character.png";
import sub_background from "../images/sub_background.png";
import SolveButton from "../components/SolveButton";
import { useNavigate } from "react-router-dom";

const AdditionalCompletePage = () => {
  const navigate = useNavigate();

  const handleMyPageClick = () => {
    navigate("/mypage/practice");
  };

  return (
    <CompletePageWrapper>
      <Header />
      <CompleteInfoWrapper>
        <CharacterSection>
          <img src={character} alt="character" />
        </CharacterSection>
        <CommentSection>
          {`추가 연습 문제 생성 완료!\n이제 풀어보러 가볼까요?`
            .split("\n")
            .map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
        </CommentSection>
        <ButtonSection>
          <SolveButton
            onClick={handleMyPageClick}
            children={`마이페이지에서 생성된 추가 연습 문제를 풀어보세요!\n마이페이지로 이동하기`}
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
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
`;

export default AdditionalCompletePage;
