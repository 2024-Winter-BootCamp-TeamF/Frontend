import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NoteIcon from "../images/mypage_note.png";
import MoreNoteIcon from "../images/mypage_morenote.png";
import DeleteIcon from "../images/delete.png";
import ExButton from "../components/ExButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

// 날짜 포맷팅 함수
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const yearMonthDay = `${date.getFullYear()}.${String(
    date.getMonth() + 1
  ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
  const hourMinute = `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
  return `${yearMonthDay} ${hourMinute}`;
};

const generateCardTitle = (note) => {
  if (note.name) {
    // 추가 오답노트의 이름 사용
    return note.name;
  }
  const topic = note.topics?.[0] || "기본"; // 일반 오답노트의 첫 번째 topic 사용
  return `${topic}_오답노트`;
};
const UserPageNote = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("wrongNotes")) || [];
    const sortedNotes = savedNotes.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setNotes(sortedNotes);
  }, []);

  // 삭제 로직
  const handleDelete = (e, id) => {
    e.stopPropagation(); // 이벤트 전파 중단
    const updatedNotes = notes.filter((note) => note.id !== id); // 삭제 대상 제외
    setNotes(updatedNotes); // 상태 업데이트
    localStorage.setItem("wrongNotes", JSON.stringify(updatedNotes)); // localStorage 업데이트
    alert("오답노트가 삭제되었습니다.");
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
          <Card
            key={note.id}
            onClick={() =>
              note.name
                ? navigate("/morenote", { state: { problems: note.problems } })
                : navigate("/note", { state: { problems: note.problems } })
            }
          >
            <DeleteButton onClick={(e) => handleDelete(e, note.id)}>
              <img src={DeleteIcon} alt="삭제" />
            </DeleteButton>
            <IconWrapper>
              <img
                src={note.name ? MoreNoteIcon : NoteIcon} // 추가 오답노트는 MoreNoteIcon, 일반은 NoteIcon
                alt={note.name ? "추가 오답노트" : "일반 오답노트"}
              />{" "}
            </IconWrapper>
            <CardText>
              {generateCardTitle(note)}
              <DateText>{formatDate(note.date)}</DateText>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border: 2px solid #5c85ff;
  border-radius: 10px;
  padding: 15px;
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
  font-size: 12px;
  color: #888888;
  text-align: center; /* 날짜와 시간을 가운데 정렬 */
`;
