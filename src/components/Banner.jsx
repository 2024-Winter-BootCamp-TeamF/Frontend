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
            <AnimatedText>혼자 공부하는 대학생들을 위한</AnimatedText>
            <br />
            <AnimatedText delay="1s">학습 보조 AI</AnimatedText>
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
  height: 90vh;
  background-image: url(${background});
  background-position: center;
  background-size: cover;
  display: flex;
  align-items: flex-end;

  @media screen and (max-width: 768px) {
    height: 80vh;
  }
`;

const BannerContent = styled.div`
  margin: 0 auto;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 20px;
    gap: 30px;
  }
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 70px 40px 50px 70px;

  @media screen and (max-width: 1024px) {
    padding: 50px 30px 40px 50px;
  }

  @media screen and (max-width: 768px) {
    padding: 30px 20px;
    align-items: center;
    text-align: center;
  }
`;

const LogoWrapper = styled.div`
  img {
    width: 400px;
    height: auto;

    @media screen and (max-width: 1024px) {
      width: 300px;
    }

    @media screen and (max-width: 768px) {
      width: 250px;
    }

    @media screen and (max-width: 480px) {
      width: 200px;
    }
  }
`;

const SubTitle = styled.p`
  font-size: 25px;
  color: #5887f4;
  margin: 10px 0 0 0;
  padding-bottom: 100px;

  @media screen and (max-width: 1024px) {
    font-size: 22px;
    padding-bottom: 80px;
  }

  @media screen and (max-width: 768px) {
    font-size: 20px;
    padding-bottom: 50px;
  }

  @media screen and (max-width: 480px) {
    font-size: 18px;
    padding-bottom: 30px;
  }
`;

const CharacterSection = styled.div`
  padding-top: 100px;
  padding-left: 50px;
  padding-bottom: 15px;
  
  img {
    width: auto;
    max-height: 450px;

    @media screen and (max-width: 1024px) {
      max-height: 350px;
    }

    @media screen and (max-width: 768px) {
      max-height: 300px;
      padding-left: 0;
    }

    @media screen and (max-width: 480px) {
      max-height: 250px;
    }
  }
`;

const AnimatedText = styled.span`
  display: inline-block;
  opacity: 0;
  animation: fadeInUp 1s ease forwards;
  animation-delay: ${props => props.delay || '0s'};

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
  }

  @media screen and (max-width: 480px) {
    font-size: 16px;
  }
`;

export default Banner;
