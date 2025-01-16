const theme = {
  colors: {
    main_blue: "#5887F4",
    sub_blue_1: "#86ABFF",
    sub_blue_2: "#9EBBFF",
    sub_blue_3: "#B8CEFF",
    sub_orange: "#F24822",
  },
  fonts: {
    main: "'HakgyoansimAllimjangTTF-R', sans-serif",
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
      font-family: 'HakgyoansimAllimjangTTF-R';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimAllimjangTTF-R.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: 'SUITE-Regular';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-Regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
    }
      @font-face {
      font-family: 'SUITE-ExtraBold';
      src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-2@1.0/SUITE-ExtraBold.woff2') format('woff2');
      font-weight: 900;
      font-style: normal;
    }
  `,
  images: {
    logo: "/images/logo.svg",
    character: "/images/character.png",
    main_background: "/images/main_background.png",
    sub_background: "/images/sub_background.png",
    footer: "/images/footer.png",
    add: "/images/add.png",
    delete: "/images/delete.png",
    correct: "/images/correct.png",
    summary: "/images/summary.png",
    practice: "/images/practice.png",
    note: "/images/note.png",
    mypage: "/images/mypage.png",
    mypage_summary: "/images/mypage_summary.png",
    mypage_practice: "/images/mypage_practice.png",
    mypage_note: "/images/mypage_note.png",
  },
};

export default theme;
