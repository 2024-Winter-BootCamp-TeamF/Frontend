import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axiosInstance from "../axiosInstance";

import ExtensionIcon from "../images/Extension (2).png";
import ReductionIcon from "../images/reduction (2).png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SolveButton from "../components/SolveButton";
import SampleButton from "../components/SampleButton";
import SampleButton2 from "../components/SampleButton2";
import { useNavigate, useLocation } from "react-router-dom";

const SamplePage = () => {
  const [showPDFViewer, setShowPDFViewer] = useState(true);
  const [isExtensionActive, setIsExtensionActive] = useState(false);
  const [summaryPDF, setSummaryPDF] = useState(null);
  const [isLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pdfFile = location.state?.pdfFile;
  const topK = location.state?.top_k;
  const topics = location.state?.topics;

  useEffect(() => {
    const fetchSummaryPDF = async () => {
      try {
        console.log("요청 데이터:", { top_k: topK, topics: topics });

        const response = await axiosInstance.post("/langchain/summary/", {
          top_k: topK, // 숫자
          topics: topics, // 문자열 배열
        });

        if (response.data.status === "success") {
          setSummaryPDF(response.data.pdf_url); // 서버 응답이 올바른 경우 처리
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
      }
    };

    fetchSummaryPDF();
  }, [topK, topics]);

  const handleIconClick = () => {
    setShowPDFViewer(false);
    setIsExtensionActive(true);
  };

  const handleReductionClick = () => {
    setShowPDFViewer(true); // PDFViewer 다시 보이도록 설정
    setIsExtensionActive(false); // 아이콘을 원래 상태로 되돌림
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
            {summaryPDF ? (
              <iframe
                src={summaryPDF}
                title="Summary PDF Viewer"
                style={{ height: "100%", width: "100%" }}
              />
            ) : (
              <LoadingText>요약본을 불러오는 중입니다...</LoadingText>
            )}
            {/* <IconWrapper
              onClick={
                isExtensionActive ? handleReductionClick : handleIconClick
              }
            >
              <img
                src={isExtensionActive ? ReductionIcon : ExtensionIcon}
                alt="Extension"
              />
            </IconWrapper>
            {summaryPDF && (
              <iframe
                src={summaryPDF}
                title="Summary PDF Viewer"
                style={{ height: "100%", width: "100%" }}
              />
            )*/}
          </SummaryBox>
        </MainContent>
        <ButtonContainer>
          <SampleButton2 onClick={() => navigate("/mypage/summary")}>
            <LightText>연습 문제까지 볼 시간이 없다.</LightText>
            <BoldText>요약본만 확인하기</BoldText>
          </SampleButton2>
          <SampleButton2 onClick={() => navigate("/mypage/summary")}>
            <LightText>연습 문제로 확실히 대비해볼까?</LightText>
            <BoldText>연습 문제 생성하기</BoldText>
          </SampleButton2>
        </ButtonContainer>
      </MainContentWrapper>
      <Footer />

      {isLoading && (
        <LoadingModal>
          <LoadingContent>
            <LoadingSpinner />
            <LoadingText>요약본을 생성하고 있습니다...</LoadingText>
          </LoadingContent>
        </LoadingModal>
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

const IconWrapper = styled.div`
  position: absolute;
  left: -65px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer; // 커서를 포인터로 변경
  img {
    width: 45px;
    height: 45px;
    transition: transform 0.2s; // 부드러운 애니메이션 추가
  }

  &:hover img {
    transform: scale(1.1); // 마우스 오버 시 이미지 크기 증가
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

const LoadingModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
