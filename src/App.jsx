import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// ... 다른 imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/practice" element={<PracticePage />} />{" "}
        {/* 기존 연습문제 페이지 */}
        <Route path="/notes" element={<WrongAnswer />} />{" "}
        {/* 새로운 오답 노트 페이지 */}
      </Routes>
    </Router>
  );
}
