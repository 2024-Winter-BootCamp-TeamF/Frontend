import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import character from "../images/character.png";
import sub_background from "../images/sub_background.png";
import SolveButton from "../components/SolveButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PracticeCompletePage = () => {
  const navigate = useNavigate();

  const handleMyPageClick = () => {
    navigate("/mypage/practice");
  };

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
            children={`마이페이지에서 생성된 연습 문제를 풀어보세요!\n마이페이지로 이동하기`}
            onClick={() => {
              handleMyPageClick();
              handleDataDelete();
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
  margin-bottom: 20px;
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
  margin-top: 40px;
`;

export default PracticeCompletePage;
