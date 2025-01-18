import React from "react";
import styled from "styled-components";
import logo from "../images/logo.svg";
import user from "../images/user.png";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username");

    if (isLoggedIn && username) {
      navigate(`/users/${username}/summary`);
    } else {
      navigate("/login");
    }
  };

  return (
    <HeaderWrapper>
      <LogoWrapper>
        <Link to="/main">
          <img src={logo} alt="logo" />
        </Link>
      </LogoWrapper>
      <UserWrapper onClick={handleUserClick}>
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
  position: absolute; /* 페이지 내에서 자유롭게 배치되도록 설정 */
  box-sizing: border-box;
  padding: 10px 0 25px;
  top: 0; /* 페이지의 가장 상단에 위치 */
  z-index: 100; /* 항상 다른 요소들 위에 배치 */
  background-color: #ffffff;
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
  cursor: pointer;
`;

export default Header;
