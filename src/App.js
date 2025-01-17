import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import UploadPage from "./pages/UploadPage";
import ProblemContent from "./pages/PracticePage/ProblemContent";
import WrongAnswer from "./pages/NotePage/WrongAnswer";
import { problems } from "./pages/PracticePage/data";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<UploadPage />} />
          <Route
            path="/practice"
            element={<ProblemContent problems={problems} />}
          />
          <Route path="/note" element={<WrongAnswer />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
