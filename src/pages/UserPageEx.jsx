import React, { useEffect, useState } from "react";
import styled from "styled-components";
import addIcon from "../images/add.png";
import ExIcon from "../images/mypage_practice.png";
import DeleteIcon from "../images/delete.png"; // 삭제 아이콘 추가
import ExButton from "../components/ExButton";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate, useLocation } from "react-router-dom";

const UserPageEx = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const topics = location.state?.topics || []; // UploadPage에서 전달된 topics

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (template) => {
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

      const allSuccessful = responses.every((response) => response.ok);
      if (!allSuccessful) {
        throw new Error("일부 문제를 삭제하는 데 실패했습니다.");
      }

      setQuestions((prevQuestions) =>
        prevQuestions.filter((t) => t !== template)
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

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    const yearMonthDay = `${date.getFullYear()}.${String(
      date.getMonth() + 1
    ).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
    const hourMinute = `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
    return { yearMonthDay, hourMinute };
  };
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
        {questions.map((template, index) => {
          const formattedDate = getFormattedDate(template[0]?.created_at); // 날짜와 시간을 포맷팅한 객체
          const topic = template[0]?.question_topic || "기본"; // 첫 번째 문제의 토픽 가져오기
          return (
            <Card
              key={`topic_${index}`}
              onClick={() => {
                console.log("전달할 문제 템플릿:", template);
                navigate("/practice", { state: { problems: template } });
              }}
            >
              <DeleteButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(template);
                }}
              >
                <img src={DeleteIcon} alt="삭제" />
              </DeleteButton>
              <IconWrapper>
                <img src={ExIcon} alt="연습문제" />
              </IconWrapper>
              <CardText>
                {`${topic}_연습문제`}
                <DateText>
                  {formattedDate.yearMonthDay} {formattedDate.hourMinute}
                </DateText>
              </CardText>
            </Card>
          );
        })}
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
  font-size: 12px;
  color: #888888;
  text-align: center; /* 날짜와 시간을 가운데 정렬 */
`;

export default UserPageEx;
