import React from "react";
import styled from "styled-components";
import LoginBox from "../components/LoginBox";
import Footer from "../components/Footer";
import logo from "../images/logo.svg";

const LoginPage = () => {
  return (
    <LoginPageWrapper>
      <LoginBoxWrapper>
        <LogoSection>
          <img src={logo} alt="logo" />
        </LogoSection>
        <LoginBox />
      </LoginBoxWrapper>
      <Footer />
    </LoginPageWrapper>
  );
};

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 350px;
  }
  padding-bottom: 20px;
`;

const LoginBoxWrapper = styled.div`
  padding-top: 30px;
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
`;

const LoginPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default LoginPage;
