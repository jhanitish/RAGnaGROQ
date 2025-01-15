import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchEngine from './pages/SearchEngine';
import LeetCodeAssistant from './pages/LeetCodeBot';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search-engine" element={<SearchEngine />} />
        <Route path="/leetcode-bot" element={<LeetCodeAssistant />} />
      </Routes>
    </Router>
  );
};

export default App;
