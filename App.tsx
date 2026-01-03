
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 font-sans antialiased text-slate-200">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/wallpaper/:id" element={<DetailScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
