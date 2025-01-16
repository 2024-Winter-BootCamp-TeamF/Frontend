import React from "react";
import styled from "styled-components";
import LoginBox from "../components/LoginBox";

const LoginPage = () => {
  return (
    <LoginPageWrapper>
      <LoginBox />
    </LoginPageWrapper>
  );
};

const LoginPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default LoginPage;
