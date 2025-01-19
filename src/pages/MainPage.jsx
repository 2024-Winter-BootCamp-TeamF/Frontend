import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Introduce from "../components/Introduce";
import ScrollIndicator from "../components/ScrollIndicator";

const MainPage = () => {
  return (
    <MainPageWrapper>
      <Header />
      <Banner />
      <ScrollIndicator />
      <Introduce />
      <Footer />
    </MainPageWrapper>
  );
};

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative; /* 추가 */
`;

export default MainPage;
