import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
import CompleteInfo from "../components/CompleteInfo";

const CompletePage = () => {
  return (
    <CompletePageWrapper>
      <Header />
      <CompleteInfo />
      <Footer />
    </CompletePageWrapper>
  );
};

const CompletePageWrapper = styled.div`
width: 100%;
min-height: 100vh; /* 화면 높이를 100%로 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export default CompletePage;
