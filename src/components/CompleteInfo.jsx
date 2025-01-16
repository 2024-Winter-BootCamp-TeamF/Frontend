import styled from "styled-components";
import SolveButton from "../components/SolveButton";
import character from "../images/character.png";
import sub_background from "../images/sub_background.png";

const CompleteInfo = () => {
  return (
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
          children={`지금이라면 다 맞을 수 있어\n추가 연습 문제 풀어보기`}
        />
        <SolveButton
          children={`공부를 조금 더... 해볼까...?\n마이페이지에 저장하기`}
        />
      </ButtonSection>
    </CompleteInfoWrapper>
  );
};

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
const CharacterSection = styled.div`
  img {
    width: 280px;
    height: auto;
  }
`;
const CommentSection = styled.div`
  font-size: 36px;
  padding-top: 20px;
  padding-bottom: 50px;
`;
const ButtonSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
`;

export default CompleteInfo;
