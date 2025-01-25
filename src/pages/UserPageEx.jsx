import React, { useEffect, useState } from "react";
import styled from "styled-components";
import addIcon from "../images/add.png";
import ExIcon from "../images/mypage_practice.png";
import MoreExIcon from "../images/mypage_morepractice.png";
import DeleteIcon from "../images/delete.png"; // 삭제 아이콘 추가
import ExButton from "../components/ExButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const UserPageEx = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [templates, setTemplates] = useState([]);
  const [sortedTemplates, setSortedTemplates] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 템플릿 데이터 불러오기
    const storedTemplates =
      JSON.parse(localStorage.getItem("practiceTemplates")) || [];
    setTemplates(storedTemplates);
  }, []);

  const handleDeleteTemplate = (id) => {
    const confirmDelete = window.confirm(
      "정말로 이 연습문제를 삭제하시겠습니까?"
    );
    if (!confirmDelete) return;

    const updatedTemplates = templates.filter((template) => template.id !== id);
    setTemplates(updatedTemplates);
    localStorage.setItem("templates", JSON.stringify(updatedTemplates));
    alert("추가 연습 문제 템플릿이 삭제되었습니다.");
  };

  const handleDelete = async (template) => {
    const confirmDelete = window.confirm(
      "정말로 이 연습문제를 삭제하시겠습니까?"
    );
    if (!confirmDelete) {
      console.log("삭제 작업이 취소되었습니다.");
      return; // 확인하지 않으면 삭제 작업 중단
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const questionIds = template.map((question) => question.id);

      const deleteRequests = questionIds.map((id) =>
        fetch(`http://localhost:8000/api/question/questions/${id}/delete/`, {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        })
      );

      const responses = await Promise.all(deleteRequests);

      if (!responses.every((response) => response.ok)) {
        throw new Error("일부 문제를 삭제하는 데 실패했습니다.");
      }

      setQuestions((prevQuestions) =>
        prevQuestions.filter((t) => t !== template)
      );

      alert("연습 문제가 삭제 되었습니다.");
    } catch (error) {
      console.error("문제 삭제 중 오류 발생:", error);
      alert("카드를 삭제하는 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          alert("로그인이 필요합니다.");
          return;
        }

        const response = await fetch(
          "http://localhost:8000/api/question/all-questions/",
          {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("연습문제를 불러오는 데 실패했습니다.");
        }

        const data = await response.json();
        const groupedTemplates = [];
        for (let i = 0; i < data.length; i += 10) {
          groupedTemplates.push(data.slice(i, i + 10));
        }
        setQuestions(groupedTemplates.reverse()); // 역순으로 정렬
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("연습문제를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchQuestions();
  }, []);

  const getFormattedDate = (dateString) => {
    if (!dateString) return "날짜 없음"; // 날짜 데이터가 없을 경우 기본값
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 2자리
    const day = String(date.getDate()).padStart(2, "0"); // 일 2자리
    const hour = String(date.getHours()).padStart(2, "0"); // 시 2자리
    const minute = String(date.getMinutes()).padStart(2, "0"); // 분 2자리
    return `${year}.${month}.${day} ${hour}:${minute}`;
  };

  useEffect(() => {
    const combineAndSortData = () => {
      const generalTemplates = questions.map((template) => ({
        type: "general",
        title: `${template[0]?.question_topic || "기본"}_연습 문제`,
        createdAt: new Date(template[0]?.created_at),
        data: template,
      }));

      const additionalTemplates = templates.map((template) => ({
        type: "additional",
        title: template.title,
        createdAt: new Date(template.id),
        data: template.questions,
      }));

      const combinedData = [...generalTemplates, ...additionalTemplates].sort(
        (a, b) => b.createdAt - a.createdAt
      );

      setSortedTemplates(combinedData);
    };

    combineAndSortData();
  }, [questions, templates]);

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
          <CardText>연습 문제 만들기</CardText>
        </Card>
        {sortedTemplates.map((item, index) => (
          <Card
            key={index}
            onClick={() => {
              if (item.type === "general") {
                navigate("/practice", { state: { problems: item.data } });
              } else if (item.type === "additional") {
                navigate("/morepractice", { state: { problems: item.data } });
              }
            }}
          >
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                if (item.type === "general") {
                  handleDelete(item.data);
                } else if (item.type === "additional") {
                  handleDeleteTemplate(item.data.id);
                }
              }}
            >
              <img src={DeleteIcon} alt="삭제" />
            </DeleteButton>
            <IconWrapper>
              <img
                src={item.type === "general" ? ExIcon : MoreExIcon} // 일반은 ExIcon, 추가는 MoreExIcon
                alt={
                  item.type === "general" ? "일반 연습 문제" : "추가 연습 문제"
                }
              />
            </IconWrapper>
            <CardText>
              {item.title}
              <DateText>{getFormattedDate(item.createdAt)}</DateText>
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
  font-size: 12px;
  color: #888888;
  text-align: center; /* 날짜와 시간을 가운데 정렬 */
`;

export default UserPageEx;
