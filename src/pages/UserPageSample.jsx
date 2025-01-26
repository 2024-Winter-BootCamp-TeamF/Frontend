import React, { useState, useEffect } from "react";
import styled from "styled-components";
import addIcon from "../images/add.png";
import summaryIcon from "../images/mypage_summary.png";
import DeleteIcon from "../images/delete.png";
import ExButton from "../components/ExButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const UserPageSample = ({ pdfUrl }) => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);

  // 시간 기준으로 역순 정렬
  useEffect(() => {
    const storedCards = localStorage.getItem("cards");
    if (storedCards) {
      const parsedCards = JSON.parse(storedCards);

      // 시간 기준으로 역순 정렬
      const sortedCards = parsedCards.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // 최신순 정렬
      });

      setCards(sortedCards); // 정렬된 데이터를 상태에 저장
    }
  }, []);

  const handleDelete = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
    localStorage.setItem("cards", JSON.stringify(updatedCards)); // 삭제 후 localStorage 업데이트
  };

  const handleCardClick = (id) => {
    const selectedCard = cards.find((card) => card.id === id);
    if (selectedCard) {
      const selectedPdfUrl = selectedCard.pdfUrl; // 선택된 카드의 PDF URL 가져오기
      window.open(selectedPdfUrl, "_blank"); // 새로운 창에서 PDF 열기
    }
  };

  return (
    <Container>
      <Header />
      <Nav>
        <ExButton variant="filled" isActive={true}>
          요약본
        </ExButton>
        <ExButton
          variant="outlined"
          onClick={() => navigate("/mypage/practice")}
        >
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
          <CardText>요약본 만들기</CardText>
        </Card>
        {cards &&
          cards.length > 0 &&
          cards.map((card) => (
            <Card key={card.id} onClick={() => handleCardClick(card.id)}>
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(card.id);
                }}
              >
                <img src={DeleteIcon} alt="삭제" />
              </DeleteButton>
              <IconWrapper>
                <img src={summaryIcon} alt="요약본" />
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

export default UserPageSample;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
  gap: 20px;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 800px;
  margin-top: 15px;
  margin-bottom: 120px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -10px;
  right: -10px;
  background: transparent;
  border: none;
  cursor: pointer;
  display: none;
  img {
    width: 25px;
    height: 25px;
  }
`;

const Card = styled.div`
  width: 185px;
  height: 195px;
  background-color: #ffffff;
  border: 2px solid #5c85ff;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.05);
  }

  &:hover ${DeleteButton} {
    display: block;
  }
`;

const AddIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

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
    width: 60px;
    height: 60px;
    margin-top: 20px;
    margin-bottom: 15px;
  }
`;

const CardText = styled.div`
  margin-bottom: 15px;
  font-size: 14px;
  color: black;
`;

const DateText = styled.div`
  margin-top: 5px;
  color: #888888;
  font-size: 12px;
`;
