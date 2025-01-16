import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import ProblemContent from "./pages/PracticePage/ProblemContent";

import "./App.css";
import { problems } from "./pages/PracticePage/data";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <ProblemContent problems={problems} />
      </ThemeProvider>
    </div>
  );
}

export default App;
