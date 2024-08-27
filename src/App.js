import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
//import AnotherComponent from './components/AnotherComponent'; // 他のコンポーネントも適宜インポート

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
//        <Route path="/another" element={<AnotherComponent />} />
        {/* 他のルートを追加 */}
      </Routes>
    </Router>
  );
}

export default App;

