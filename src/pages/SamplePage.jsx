import React, { useState } from "react";
import styled from "styled-components";

import ExtensionIcon from "../images/Extension (2).png";
import ReductionIcon from "../images/reduction (2).png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SolveButton from "../components/SolveButton";

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
      <MainContentWrapper>
        <MainContent isExtensionActive={isExtensionActive}>
          {showPDFViewer && (
            <PDFViewer hide={isExtensionActive}>
              <iframe
                src="/compressed.tracemonkey-pldi-09.pdf#toolbar=0"
                title="PDF Viewer"
              />
            </PDFViewer>
          )}

          {showPDFViewer && !isExtensionActive && <Divider />}

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
            <iframe
              src="/compressed.tracemonkey-pldi-09.pdf#toolbar=0"
              title="PDF Viewer"
              style={{ height: "100%", width: "100%" }}
            />
          </SummaryBox>
        </MainContent>
        <SolveButton
          children={"마이페이지에 저장 완료!\n마이페이지로 이동하기"}
        />
      </MainContentWrapper>
      <Footer />
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
  transition: width 0.3s ease;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
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
  height: calc(100% - 10px); // 높이는 필요에 따라 조절
  background-color: #86abff; // 회색 계열의 색상
  margin: 0 40px; // 좌우 여백
`;

export default SamplePage;
