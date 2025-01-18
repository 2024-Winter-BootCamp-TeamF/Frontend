import styled from "styled-components";
import character from "../images/character.png";
import logo from "../images/logo.svg";
import background from "../images/main_background.png";

const Banner = () => {
  return (
    <BannerWrapper>
      <BannerContent>
        <TitleSection>
          <LogoWrapper>
            <img src={logo} alt="logo" />
          </LogoWrapper>
          <SubTitle>
            혼자 공부하는 대학생들을 위한
            <br />
            학습 보조 AI
          </SubTitle>
        </TitleSection>
        <CharacterSection>
          <img src={character} alt="character" />
        </CharacterSection>
      </BannerContent>
    </BannerWrapper>
  );
};

const BannerWrapper = styled.div`
  width: 100%;
  height: 80vh;
  background-image: url(${background});
  background-position: center; /* 배경 이미지 위치 */
  background-size: contain;
  display: flex;
  align-items: flex-end;
`;

const BannerContent = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-items: flex-end;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 70px 70px 50px 70px;
`;

const LogoWrapper = styled.div`
  img {
    width: 600px;
    height: auto;
  }
`;

const SubTitle = styled.p`
  font-size: 50px;
  color: #5887f4;
  margin: 10px 0 0 0;
`;

const CharacterSection = styled.div`
  padding-bottom: 15px;
  img {
    width: auto;
    max-height: 600px;
  }
`;

export default Banner;
