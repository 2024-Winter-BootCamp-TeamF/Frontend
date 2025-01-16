import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Introduce from "../components/Introduce";

const MainPage = () => {
  return (
    <MainPageWrapper>
      <Header />
      <Banner />
      <Introduce />
      <Footer />
    </MainPageWrapper>
  );
};

const MainContentSection = styled.div``;

const MainPageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default MainPage;
