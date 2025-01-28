import styled, { keyframes } from "styled-components";
import character from "../images/character.png";
import logo from "../images/logo.svg";
import background from "../images/main_background.png";
import PenIcon from "../images/pen.png";
import DocsIcon from "../images/docs.png";

const Banner = () => {
  const icons = [
    { top: 26, left: 8, duration: 8, src: PenIcon }, // 1
    { top: 7, left: 40, duration: 10, src: PenIcon }, // 2
    { top: 22, left: 92, duration: 8, src: PenIcon }, // 3
    { top: 32, left: 52, duration: 10, src: PenIcon }, // 3

    { top: 10, left: 14, duration: 8, src: DocsIcon }, // 1
    { top: 34, left: 28, duration: 10, src: DocsIcon }, // 2
    { top: 10, left: 80, duration: 10, src: DocsIcon },
    { top: 36, left: 85, duration: 8, src: DocsIcon },
  ];

  return (
    <BannerWrapper>
      {icons.map((icon, index) => (
        <Icon
          key={index}
          $top={icon.top}
          $left={icon.left}
          $duration={icon.duration}
          $src={icon.src} // 동적으로 소스 전달
        />
      ))}
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

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Icon = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  background-image: url(${(props) => props.$src});
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 1;
  animation: ${rotate} ${(props) => props.$duration}s linear infinite;
  top: ${(props) => props.$top}%;
  left: ${(props) => props.$left}%;
  z-index: -1;
`;

const BannerWrapper = styled.div`
  width: 100%;
  height: 90vh;
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
  animation: fadeIn 1s ease forwards;
  animation-delay: ${(props) => props.delay || "0s"};

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
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
