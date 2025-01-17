import React from "react";
import styled from "styled-components";
import footer from "../images/footer.png";

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterImg>
        <img src={footer} alt="footer logo" />
      </FooterImg>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  position: absolute; /* 뷰포인트 내 고정을 막기 위한 설정 */
  width: 100%;
  z-index: -1; /* 헤더보다 낮은 z-index 설정 */
  bottom: 0;
`;

const FooterImg = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 100%;
    height: auto;
  }
`;

export default Footer;
