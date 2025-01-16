import React from "react";
import styled from "styled-components";
import FooterImage from "../images/footer.png";
import userIcon from "../images/user.png";
import logo from "../images/logo.svg";

const SamplePage = () => {
  return (
    <Container>
      <Header>
        <LogoWrapper>
          <img src={logo} alt="내 교수님은 AI" />
        </LogoWrapper>
        <ProfileIcon>
          <img src={userIcon} alt="Profile" />
        </ProfileIcon>
      </Header>
      
      <Footer>
        <FooterImg src={FooterImage} alt="Footer" />
      </Footer>
    </Container>
  );
};

export default SamplePage;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  box-sizing: border-box;
  // padding-top: 10px;
  padding-bottom: 20px;
`;

const LogoWrapper = styled.div`
  img {
    width: 150px;
    height: auto;
  }
`;

const ProfileIcon = styled.div`
  right: 20px;
  position: absolute;
  img {
    width: 40px;
    height: 40px;
  }
`;

const Footer = styled.footer`
  margin-top: auto;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FooterImg = styled.img`
  width: 100%;
  height: auto;
`;
