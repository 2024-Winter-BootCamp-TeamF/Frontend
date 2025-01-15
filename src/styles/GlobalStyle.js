import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${(props) => props.theme.fontFaces}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${(props) => props.theme.fonts.main};
    background-color: #fff; 
    color: #000;
  }
`;

export default GlobalStyle;