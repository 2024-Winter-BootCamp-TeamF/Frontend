import React, { useState } from "react";
import styled from "styled-components";
import addIcon from "../images/add.png";
import ExIcon from "../images/mypage_practice.png";
import DeleteIcon from "../images/delete.png"; // 삭제 아이콘 추가
import ExButton from "../components/ExButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const UserPageEx = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([
    { id: 1, title: "웹퍼블리싱응용 Ch1", date: "2025.01.01" },
    { id: 2, title: "컴퓨터구조 7장", date: "2025.01.04" },
    { id: 3, title: "데이터베이스 2장", date: "2025.01.05" },
    { id: 4, title: "웹퍼블리싱응용 Ch2", date: "2025.01.08" },
  ]);

  const handleDelete = (id) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <Container>
      <Header />
      <Nav>
        <ExButton
          variant="outlined"
          onClick={() => navigate("/mypage/summary")}
        >
          요약본
        </ExButton>
        <ExButton variant="filled" isActive={true}>
          연습 문제
        </ExButton>
        <ExButton variant="outlined" onClick={() => navigate("/mypage/note")}>
          오답 노트
        </ExButton>
      </Nav>
      <Content>
        <Card onClick={() => navigate("/upload")}>
          <AddIconWrapper>
            <img src={addIcon} alt="추가하기" />
          </AddIconWrapper>
          <CardText>연습문제 만들기</CardText>
        </Card>
        {cards.map((card) => (
          <Card
            key={card.id}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(card.id);
              }}
            >
              <img src={DeleteIcon} alt="삭제" />
            </DeleteButton>
            <IconWrapper>
              <img src={ExIcon} alt="요약본" />
            </IconWrapper>
            <CardText>
              {card.title}
              <DateText>{card.date}</DateText>
            </CardText>
          </Card>
        ))}
      </Content>
      <Footer />
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;

  /* Footer를 하단에 고정하기 위한 스타일 추가 */
  > div:last-child {
    margin-top: auto; // Footer를 하단으로 밀어내기
    width: 100%; // Footer의 너비를 100%로 설정
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin: 10px 20px;
  gap: 10px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin-top: 25px;

  // margin-bottom: 50px;  // Footer와의 간격을 위해 추가
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -10px; // 위쪽으로 이동
  right: -10px; // 오른쪽으로 이동
  background: transparent;
  border: none;
  cursor: pointer;
  display: none; // 기본적으로 숨김
  img {
    width: 25px;
    height: 25px;
  }
`;

const Card = styled.div`
  background-color: #ffffff;
  border: 2px solid #5c85ff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  position: relative;

  &:hover {
    transform: scale(1.05);
  }

  &:hover ${DeleteButton} {
    display: block; // 마우스 오버 시 삭제 버튼 보이기
  }
`;

const AddIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 40px;
    height: 40px;
    margin-top: 30px;
    margin-bottom: 15px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  img {
    width: 50px;
    height: 50px;
    margin-top: 20px;
    margin-bottom: 15px;
  }
`;

const CardText = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 14px;
  color: black;
`;

const DateText = styled.div`
  margin-top: 5px;
  font-size: 12px;
  color: #888888;
`;

export default UserPageEx;
