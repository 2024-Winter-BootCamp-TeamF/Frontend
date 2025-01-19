import React, { useState } from "react";
import styled from "styled-components";

import ExButton from "../components/ExButton";
import ExtensionIcon from "../images/Extension.png";
import ReductionIcon from "../images/reduction.png";
import Footer from "../components/Footer";
import Header from "../components/Header";

const SamplePage = () => {
  const [showPDFViewer, setShowPDFViewer] = useState(true);
  const [isExtensionActive, setIsExtensionActive] = useState(false);

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
      <MainContent>
        {showPDFViewer && (
          <PDFViewer>
            <img src="/path-to-pdf-preview.png" alt="PDF Preview" />
          </PDFViewer>
        )}

        {showPDFViewer && <Divider />}

        <SummaryBox style={{ minHeight: showPDFViewer ? "350px" : "500px" }}>
          <IconWrapper
            onClick={isExtensionActive ? handleReductionClick : handleIconClick}
          >
            <img
              src={isExtensionActive ? ReductionIcon : ExtensionIcon}
              alt="Extension"
            />
          </IconWrapper>
          <Title>요약본 출력</Title>
          <Subtitle>(PDF 뷰어 사용)</Subtitle>
        </SummaryBox>
      </MainContent>

      <ButtonContainer>
        <ExButton variant="filled" onClick={() => {}}>
          PDF로 저장하기
        </ExButton>
        <ExButton variant="filled" onClick={() => {}}>
          마이페이지에 저장하기
        </ExButton>
      </ButtonContainer>
      <Footer />
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
  margin-top: 100px;
`;

const PDFViewer = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  background: #f5f5f5;
  min-height: 350px;
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
  cursor: pointer; // 커서를 포인터로 변경
  img {
    width: 55px;
    height: 55px;
    transition: transform 0.2s; // 부드러운 애니메이션 추가
  }

  &:hover img {
    transform: scale(1.1); // 마우스 오버 시 이미지 크기 증가
  }
`;

const Title = styled.h1`
  font-size: 24px;
  color: #000;
  margin-bottom: 10px;
`;

const Subtitle = styled.h2`
  font-size: 18px;
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
  margin: 30px 0;
`;

const Divider = styled.div`
  width: 2px;
  height: 350px; // 높이는 필요에 따라 조절
  background-color: #86abff; // 회색 계열의 색상
  margin: 0 30px; // 좌우 여백
`;

export default SamplePage;
