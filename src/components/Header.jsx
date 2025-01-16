import React from "react";
import styled from "styled-components";
import logo from "../images/logo.svg";
import user from "../images/user.png";

const Header = () => {
  return (
    <HeaderWrapper>
      <LogoWrapper>
        <img src={logo} alt="logo" />
      </LogoWrapper>
      <UserWrapper>
        <img src={user} alt="user" />
      </UserWrapper>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  width: 100%;
  position: absolute; 
  box-sizing: border-box;
  padding-top: 10px;
  padding-bottom: 25px;
  top: 0;
`;

const LogoWrapper = styled.div`
  img {
    width: 150px;
    height: auto;
  }
`;

const UserWrapper = styled.div`
  right: 20px;
  position: absolute;
  img {
    width: 40px;
    height: 40px;
  }
`;

export default Header;