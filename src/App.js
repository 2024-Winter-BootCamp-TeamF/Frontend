import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import UploadPage from "./pages/UploadPage";
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
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/sample" element={<SamplePage />} />
          <Route path="/summary" element={<UserPageSample />} />
          <Route path="/practice" element={<UserPageEx />} />
          <Route path="/note" element={<UserPageNote />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
