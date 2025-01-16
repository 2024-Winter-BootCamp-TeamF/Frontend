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

const MainPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 200vh; // 페이지 전체 높이
`;

export default MainPage;
