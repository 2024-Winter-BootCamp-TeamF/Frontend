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
  width: 100%;
  height: 100px;
  background-color: white;
  position: absolute;
  bottom: 0;
  z-index: -1;
`;

const FooterImg = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;

  img {
    width: 100%;
    height: auto;

    display: block;
  }
`;

export default Footer;
