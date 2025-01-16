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
  position: fixed; /* 페이지 상단에 고정 */
  top: 0; /* 화면의 최상단에 위치 */
  left: 0;
  z-index: 1000; /* 다른 요소 위에 표시되도록 z-index 설정 */
  background-color: #fff; /* 배경색 추가 (겹치는 요소 방지) */
  box-sizing: border-box;
  padding-top: 10px;
  padding-bottom: 25px;
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
