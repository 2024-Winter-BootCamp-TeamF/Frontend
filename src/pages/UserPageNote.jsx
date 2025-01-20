import React, { useState } from "react";
import styled from "styled-components";
import NoteIcon from "../images/mypage_note.png";
import DeleteIcon from "../images/delete.png";
import ExButton from "../components/ExButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const UserPageNote = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([
    { id: 1, title: "웹퍼블리싱응용 Ch1", date: "2025.01.01" },
    { id: 2, title: "컴퓨터구조 7장", date: "2025.01.04" },
    { id: 3, title: "데이터베이스 2장", date: "2025.01.05" },
    { id: 4, title: "웹퍼블리싱응용 Ch2", date: "2025.01.08" },
  ]);

  const handleDelete = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
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
        <ExButton
          variant="outlined"
          onClick={() => navigate("/mypage/practice")}
        >
          연습 문제
        </ExButton>
        <ExButton variant="filled" isActive={true}>
          오답 노트
        </ExButton>
      </Nav>
      <Content>
        {notes.map((note) => (
          <Card key={note.id}>
            <DeleteButton onClick={() => handleDelete(note.id)}>
              <img src={DeleteIcon} alt="삭제" />
            </DeleteButton>
            <IconWrapper>
              <img src={NoteIcon} alt="요약본" />
            </IconWrapper>
            <CardText>
              {note.title}
              <DateText>{note.date}</DateText>
            </CardText>
          </Card>
        ))}
      </Content>
      <Footer />
    </Container>
  );
};

export default UserPageNote;

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
    display: block;
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
