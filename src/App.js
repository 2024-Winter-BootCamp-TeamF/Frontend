import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import "./App.css";

// 기존 페이지 임포트
import UploadPage from "./pages/UploadPage";
import ProblemContent from "./pages/PracticePage/ProblemContent";
import WrongAnswer from "./pages/NotePage/WrongAnswer";
import { problems } from "./pages/PracticePage/data";

// 마이페이지 관련 임포트
import UserPageSample from "./pages/UserPageSample";
import UserPageEx from "./pages/UserPageEx";
import UserPageNote from "./pages/UserPageNote";
import SamplePage from "./pages/SamplePage";

// 새로운 페이지 임포트
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import AdditionalCompletePage from "./pages/AdditionalCompletePage";
import CheckCompletePage from "./pages/CheckCompletePage copy";
import PracticeCompletePage from "./pages/PracticeCompletePage";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          {/* 기존 라우트 */}
          <Route path="/" element={<UploadPage />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route
            path="/practice"
            element={<ProblemContent problems={problems} />}
          />
          <Route path="/note" element={<WrongAnswer />} />

          {/* 마이페이지 라우트 */}
          <Route path="/sample" element={<SamplePage />} />
          <Route path="/mypage/summary" element={<UserPageSample />} />
          <Route path="/mypage/practice" element={<UserPageEx />} />
          <Route path="/mypage/note" element={<UserPageNote />} />

          {/* 새로운 라우트 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/Addcomplete" element={<AdditionalCompletePage />} />
          <Route path="/Checkcomplete" element={<CheckCompletePage />} />
          <Route path="/Praccomplete" element={<PracticeCompletePage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
