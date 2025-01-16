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
  position: absolute;
  bottom: 0;
  z-index: -1;
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
