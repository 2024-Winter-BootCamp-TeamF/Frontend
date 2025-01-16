import React from "react";
import styled from "styled-components";
import userIcon from "../images/user.png";
import logo from "../images/logo.svg";
import FooterImage from "../images/footer.png";
import ExButton from "../components/ExButton";

const SamplePage = () => {
  return (
    <Container>
      <Header>
        <LogoWrapper>
          <img src={logo} alt="내 교수님은 AI" />
        </LogoWrapper>
        <ProfileIcon>
          <img src={userIcon} alt="Profile" />
        </ProfileIcon>
      </Header>

      <MainContent>
        <PDFViewer>
          {/* PDF 뷰어 영역 */}
          <img src="/path-to-pdf-preview.png" alt="PDF Preview" />
        </PDFViewer>
        
        <Divider />
        
        <SummaryBox>
          <Title>요약본 출력</Title>
          <Subtitle>(PDF 뷰어 사용)</Subtitle>
        </SummaryBox>
      </MainContent>

      <ButtonContainer>
        <ExButton 
          variant="filled" 
          onClick={() => {}}
        >
          PDF로 저장하기
        </ExButton>
        <ExButton 
          variant="filled" 
          onClick={() => {}}
        >
          마이페이지에 저장하기
        </ExButton>
      </ButtonContainer>

      <FooterBackground>
        <FooterImg src={FooterImage} alt="Footer" />
      </FooterBackground>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 20px 0;
`;

const LogoWrapper = styled.div`
  img {
    width: 150px;
    height: auto;
  }
`;

const ProfileIcon = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  img {
    width: 40px;
    height: 40px;
  }
`;

const MainContent = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90%;
  max-width: 1200px;
  margin: 15px;
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
  border: 2px solid #9EBBFF;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 350px;
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

const FooterBackground = styled.div`
  width: 100%;
  margin-top: auto;
`;

const FooterImg = styled.img`
  width: 100%;
  height: auto;
`;

const Divider = styled.div`
  width: 2px;
  height: 350px;  // 높이는 필요에 따라 조절
  background-color: #86ABFF;  // 회색 계열의 색상
  margin: 0 30px;  // 좌우 여백
`;

export default SamplePage;
