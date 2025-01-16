import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import UserPageSample from "./pages/UserPageSample";
import "./App.css";



function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>

          <Route path="/user" element={<UserPageSample />} />

        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
