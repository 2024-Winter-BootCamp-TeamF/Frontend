import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import ProblemContent from "./pages/PracticePage/ProblemContent";
import WrongAnswer from "./pages/NotePage/WrongAnswer";

import "./App.css";
import { problems } from "./pages/PracticePage/data";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<ProblemContent problems={problems} />} />
            <Route
              path="/practice"
              element={<ProblemContent problems={problems} />}
            />
            <Route path="/notes" element={<WrongAnswer />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
