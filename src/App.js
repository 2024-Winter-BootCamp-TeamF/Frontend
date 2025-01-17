import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import UploadPage from "./pages/UploadPage";

import "./App.css";
import { problems } from "./pages/PracticePage/data";
import LoginPage from "./pages/LoginPage";  
import UserPage from "./pages/UserPageSample";
import MainPage from "./pages/MainPage"



function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<UserPage />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
