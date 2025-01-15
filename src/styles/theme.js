const theme = {
  colors: {
    main_blue: "#5887F4",
    sub_blue_1: "#86ABFF",
    sub_blue_2: "#9EBBFF",
    sub_blue_3: "#B8CEFF",
    sub_orange: "#F24822",
  },
  fonts: {
    main: "'HakgyoansimAllimjangTTF-B', sans-serif",
    sub: "'SUITE-Regular', sans-serif",
  },
  fontFaces: `
    @font-face {
      font-family: 'HakgyoansimAllimjangTTF-B';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimAllimjangTTF-B.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
    }
    @font-face {
      font-family: 'SUITE-Regular';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
    }
  `,
};

export default theme;
