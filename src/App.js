import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import UserPageSample from "./pages/UserPageSample";
import UserPageEx from "./pages/UserPageEx";
import UserPageNote from "./pages/UserPageNote";
import SamplePage from "./pages/SamplePage";
import "./App.css";



function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<UserPageSample />} />
          <Route path="/mypage/summary" element={<UserPageSample />} />
          <Route path="/mypage/practice" element={<UserPageEx />} />
          <Route path="/mypage/note" element={<UserPageNote />} />
          <Route path="/sample" element={<SamplePage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
