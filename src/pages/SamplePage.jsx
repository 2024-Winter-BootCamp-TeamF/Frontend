import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosInstance from "../axiosInstance";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SampleButton2 from "../components/SampleButton2";
import { useNavigate, useLocation } from "react-router-dom";
import UserPageSample from "./UserPageSample";
import axios from "axios";

const SamplePage = () => {
  const [showPDFViewer, setShowPDFViewer] = useState(true);
  const [isExtensionActive, setIsExtensionActive] = useState(false);
  const [summaryPDF, setSummaryPDF] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate();
  const location = useLocation();
  const pdfFile = location.state?.pdfFile;
  const topics = location.state?.topics;
  const [cards, setCards] = useState(() => {
    // localStorage에서 기존 카드 불러오기
    const storedCards = localStorage.getItem("cards");
    return storedCards ? JSON.parse(storedCards) : [];
  });

  const handleTopicsNext = () => {
    const { topics } = location.state || {};
    navigate("/createpractice", { state: { topics, summaryPDF } });
  };

  useEffect(() => {
    const fetchSummaryPDF = async () => {
      setIsLoading(true); // 로딩 시작

      try {
        const response = await axiosInstance.post("/langchain/summary", {
          topics: topics, // 문자열 배열
        });

        if (response.data.status === "success") {
          setSummaryPDF(`${response.data.pdf_url}#toolbar=0`);
        } else {
          console.error(
            "API 호출 성공했지만 유효하지 않은 응답:",
            response.data
          );
        }
      } catch (error) {
        console.error(
          "요약 PDF를 가져오는 중 오류 발생:",
          error.response?.data || error.message
        );
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };

    fetchSummaryPDF();
  }, [topics]);

  const handleCreateCard = () => {
    // 현재 날짜와 시간을 형식에 맞게 생성
    const now = new Date();
    const formattedDate = `${now.getFullYear()}.${String(
      now.getMonth() + 1
    ).padStart(2, "0")}.${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    // topics를 기반으로 제목 구성
    const topicsTitle = topics ? `${topics.join(", ")}_요약본` : "요약본";

    const newCard = {
      id: cards.length + 1, // 카드 ID 생성
      title: `${topicsTitle}`, // topics 기반 제목 생성
      date: formattedDate, // 생성된 날짜 및 시간
      pdfUrl: summaryPDF, // PDF URL
      topics: topics || [], // topics 추가
    };

    handleAddCard(newCard); // 새로운 카드 추가
  };

  const handleAddCard = (newCard) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards, newCard]; // 새로운 카드 추가

      // 시간 기준으로 역순 정렬
      updatedCards.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA; // 최신순 정렬
      });

      localStorage.setItem("cards", JSON.stringify(updatedCards)); // localStorage에 카드 저장

      return updatedCards;
    });
  };

  const handleDataDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken"); // 토큰 가져오기
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      const response = await axios.delete(
        "http://localhost:8000/api/langchain/delete",
        {
          headers: {
            Authorization: `Token ${token}`, // 헤더에 토큰 추가
          },
        }
      );

      if (response.status === 202) {
        console.log("데이터가 성공적으로 삭제되었습니다.");
      } else {
        console.log("데이터 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      alert("API 호출 중 문제가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Header />
      <MainContentWrapper>
        <MainContent isExtensionActive={isExtensionActive}>
          {showPDFViewer && (
            <PDFViewer hide={!showPDFViewer}>
              <iframe
                src={
                  pdfFile
                    ? `${URL.createObjectURL(pdfFile)}#toolbar=0`
                    : "path/to/your/pdf/file.pdf"
                }
                width="100%"
                height="100%"
                title="PDF Viewer"
              />
            </PDFViewer>
          )}

          {showPDFViewer && !isExtensionActive && (
            <Divider hide={!showPDFViewer} />
          )}

          <SummaryBox isExtensionActive={isExtensionActive}>
            {isLoading ? (
              <LoadingContent>
                <LoadingSpinner />
                <LoadingText>요약본을 불러오는 중입니다...</LoadingText>
              </LoadingContent>
            ) : summaryPDF ? (
              <iframe
                src={summaryPDF}
                title="Summary PDF Viewer"
                style={{ height: "100%", width: "100%" }}
              />
            ) : (
              <LoadingText>요약본을 불러오는 데 실패했습니다.</LoadingText>
            )}
          </SummaryBox>
        </MainContent>
        <ButtonContainer>
          <SampleButton2
            onClick={() => {
              navigate("/mypage/summary");
              handleCreateCard();
              handleDataDelete();
            }}
          >
            <LightText>연습 문제까지 볼 시간이 없다.</LightText>
            <BoldText>요약본만 확인하기</BoldText>
          </SampleButton2>

          <SampleButton2
            onClick={() => {
              navigate("/createpractice", { state: { summaryPDF } });
              handleTopicsNext();
              handleCreateCard();
            }}
          >
            <LightText>연습 문제로 확실히 대비해볼까?</LightText>
            <BoldText>연습 문제 생성하기</BoldText>
          </SampleButton2>
        </ButtonContainer>
      </MainContentWrapper>
      <Footer />
      {summaryPDF && false && (
        <UserPageSample
          pdfUrl={summaryPDF}
          initialCards={cards}
          handleAddCard={handleAddCard}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
`;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const MainContent = styled.main`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: ${(props) =>
    props.isExtensionActive ? "center" : "space-between"};
  transition: all 0.3s ease;
  padding: 20px 100px 40px 100px;
  height: 85%; // MainContentWrapper의 높이를 기준으로 설정
`;

const PDFViewer = styled.div`
  width: 50%;
  padding: 20px;
  border: 2px solid #5887f4;
  border-radius: 8px;
  background: #fff;
  height: 100%;
  opacity: ${(props) => (props.hide ? 0 : 1)};
  transform: ${(props) => (props.hide ? "translateX(-20px)" : "translateX(0)")};
  transition: all 0.3s ease;
  display: ${(props) => (props.hide ? "none" : "block")};

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const SummaryBox = styled.div`
  width: ${(props) => (props.isExtensionActive ? "70%" : "50%")};
  height: 100%;
  background: #fff;
  border: 2px solid #5887f4;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;
  transform: ${(props) =>
    props.isExtensionActive ? "translateX(0)" : "translateX(0)"};
  opacity: 1;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    transition: all 0.3s ease;
  }
`;

const Divider = styled.div`
  width: 2px;
  height: calc(100% - 10px);
  background-color: #86abff;
  margin: 0 40px;
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.hide ? 0 : 1)};
`;

const LoadingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #86abff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  color: #333;
  font-size: 18px;
  text-align: center;
  margin: 0;
`;

const LightText = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const BoldText = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 70px; // 버튼 사이의 간격
  margin-top: 0px;
`;

export default SamplePage;
