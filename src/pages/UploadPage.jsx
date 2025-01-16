import Header from "../components/Header";
import Footer from "../components/Footer";
import styled from "styled-components";
// import 페이지요소 from "../components/CompleteInfo";

const UploadPage = () => {
  return (
    <CompletePageWrapper>
      <Header />
      <페이지 요소 />
      <Footer />
    </CompletePageWrapper>
  );
};

const CompletePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export default UploadPage;
