import React, { useState } from "react";
import styled from "styled-components";

import ExtensionIcon from "../images/Extension (2).png";
import ReductionIcon from "../images/reduction (2).png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SolveButton from "../components/SolveButton";
import { useNavigate, useLocation } from "react-router-dom";

const SamplePage = () => {
  const [showPDFViewer, setShowPDFViewer] = useState(true);
  const [isExtensionActive, setIsExtensionActive] = useState(false);
  const [isLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const pdfFile = location.state?.pdfFile;

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
            <IconWrapper
              onClick={
                isExtensionActive ? handleReductionClick : handleIconClick
              }
            >
              <img
                src={isExtensionActive ? ReductionIcon : ExtensionIcon}
                alt="Extension"
              />
            </IconWrapper>
            {/* 
          <Title>요약본 출력</Title>
          <Subtitle>(PDF 뷰어 사용)</Subtitle>
          */}
            {/* <iframe
              src="/compressed.tracemonkey-pldi-09.pdf"
              title="PDF Viewer"
              style={{ height: "100%", width: "100%" }}
            /> */}
          </SummaryBox>
        </MainContent>
        <SolveButton onClick={() => navigate("/mypage/summary")}>
          마이페이지로 이동하기
        </SolveButton>
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

export default SamplePage;
