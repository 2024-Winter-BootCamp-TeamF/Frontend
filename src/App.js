import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import UserPage from "./pages/UserPage";
import "./App.css";


function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
