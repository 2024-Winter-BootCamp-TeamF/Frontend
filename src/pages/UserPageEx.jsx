import React, { useEffect, useState } from "react";
import styled from "styled-components";
import addIcon from "../images/add.png";
import ExIcon from "../images/mypage_practice.png";
import DeleteIcon from "../images/delete.png"; // 삭제 아이콘 추가
import ExButton from "../components/ExButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { problems } from "./PracticePage/data";

const UserPageEx = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (template) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      // 템플릿에 포함된 문제 ID 추출
      const questionIds = template.map((question) => question.id);

      // 각 문제 ID에 대해 DELETE 요청을 병렬로 처리
      const deleteRequests = questionIds.map((id) =>
        fetch(`http://localhost:8000/api/question/questions/${id}/delete/`, {
          method: "DELETE",
          headers: {
            Authorization: `Token ${token}`,
          },
        })
      );

      const responses = await Promise.all(deleteRequests);

      // 모든 요청이 성공했는지 확인
      const allSuccessful = responses.every((response) => response.ok);
      if (!allSuccessful) {
        throw new Error("일부 문제를 삭제하는 데 실패했습니다.");
      }

      // 삭제 성공 시 UI에서 해당 카드 제거
      setQuestions(
        (prevQuestions) => prevQuestions.filter((t) => t !== template) // 해당 템플릿 제거
      );

      alert("카드가 성공적으로 삭제되었습니다!");
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

        // 연습문제 조회 API 호출
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
          const error = await response.json();
          throw new Error(
            error.message || "연습문제를 불러오는 데 실패했습니다."
          );
        }

        const data = await response.json();

        // 10문제씩 묶어서 상태에 저장
        const groupedTemplates = [];
        for (let i = 0; i < data.length; i += 10) {
          groupedTemplates.push(data.slice(i, i + 10));
        }

        setQuestions(groupedTemplates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        alert("연습문제를 불러오는 중 오류가 발생했습니다.");
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <p>로딩 중...</p>;
  }

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
        {questions.map((template, index) => (
          <Card
            key={index}
            onClick={() => {
              console.log("전달할 문제 템플릿:", template);
              navigate("/practice", { state: { problems: template } });
            }}
          >
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(template); // 삭제 요청
              }}
            >
              <img src={DeleteIcon} alt="삭제" />
            </DeleteButton>
            <IconWrapper>
              <img src={ExIcon} alt="연습문제" />
            </IconWrapper>
            <CardText>
              {`연습문제 ${index + 1}`}
              <DateText>{new Date().toLocaleDateString()}</DateText>
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
`;

export default UserPageEx;
