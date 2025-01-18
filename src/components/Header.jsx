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
  box-sizing: border-box;
  background-color: #ffffff;

  padding: 20px 0;
  position: relative;

  // padding: 10px 0 25px;
  // top: 0; /* 페이지의 가장 상단에 위치 */
  // z-index: 100; /* 항상 다른 요소들 위에 배치 */
  // position: absolute; /* 페이지 내에서 자유롭게 배치되도록 설정 */
`;

const LogoWrapper = styled.div`
  img {
    width: 150px;
    height: auto;
  }
`;

const UserWrapper = styled.div`
  right: 20px;
  position: absolute; /* 헤더 내에서 자유롭게 배치되도록 설정 */
  img {
    width: 40px;
    height: 40px;
  }
`;

export default Header;
