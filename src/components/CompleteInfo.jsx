import styled from "styled-components";
import SolveButton from "../components/SolveButton";
import character from "../images/character.png";

const CompleteInfo = () => {
  return (
    <CompleteInfoWrapper>
      <CharacterSection>
        <img src={character} alt="character" />
      </CharacterSection>
      <CommentSection>
        추가 연습 문제 생성 완료! 이제 풀어보러 가볼까요?
      </CommentSection>
      <ButtonSection>
        <SolveButton />
      </ButtonSection>
    </CompleteInfoWrapper>
  );
};

const CompleteInfoWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const CharacterSection = styled.div`
    img{
        width: 330px;
        height: auto;
    }
`;
const CommentSection = styled.div`
    font-size: 36px;
    font-weight: lighter;
`;
const ButtonSection = styled.div``;

export default CompleteInfo;
