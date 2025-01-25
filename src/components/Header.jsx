import React from "react";
import styled, { css } from "styled-components";
import logo from "../images/logo.svg";
import user from "../images/user.png";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ isMain }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const username = localStorage.getItem("username");

    if (isLoggedIn && username) {
      navigate(`/mypage/summary`);
    } else {
      navigate("/login");
    }
  };

  return (
    <HeaderWrapper isMain={isMain}>
      <LogoWrapper>
        <Link to="/">
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
  box-sizing: border-box;
  background-color: #ffffff;
  z-index: 10;
  padding: 10px;

  ${({ isMain }) =>
    isMain
      ? css`
          position: absolute;
          top: 0;
        `
      : css`
          position: relative;
          top: 0;
        `}
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
