import React, { useState } from "react";
import styled from "styled-components";
import ExtensionIcon from "../images/Extension.png";
import ReductionIcon from "../images/reduction.png";
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
    setShowPDFViewer(true);
    setIsExtensionActive(false);
  };

  return (
    <Container>
      <Header />
      <MainContent>
        {showPDFViewer && (
          <PDFViewer>
            <iframe
              src={
                pdfFile
                  ? URL.createObjectURL(pdfFile)
                  : "path/to/your/pdf/file.pdf"
              }
              width="100%"
              height="100%"
              title="PDF Viewer"
            />
          </PDFViewer>
        )}

        {showPDFViewer && <Divider />}

        <SummaryBox style={{ minHeight: showPDFViewer ? "350px" : "600px" }}>
          <IconWrapper
            onClick={isExtensionActive ? handleReductionClick : handleIconClick}
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
        </SummaryBox>
      </MainContent>
      <SolveButton onClick={() => navigate("/mypage/summary")}>
        마이페이지로 이동하기
      </SolveButton>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainContent = styled.main`
  display: flex;
  width: 90%;
  max-width: 1200px;
  margin-top: 30px;
  margin-bottom: 60px;
`;

const PDFViewer = styled.div`
  flex: 1;
  border: 2px solid #9ebbff;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 350px;
  position: relative;
`;

const SummaryBox = styled.div`
  flex: 1;
  border: 2px solid #9ebbff;
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 350px;
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: -28px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  img {
    width: 55px;
    height: 55px;
    transition: transform 0.2s;
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const Divider = styled.div`
  width: 2px;
  height: 600px;
  background-color: #86abff;
  margin: 0 30px;
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
