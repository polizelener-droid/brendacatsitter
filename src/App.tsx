import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ContentProvider } from './content/ContentContext';
import { AdminApp } from './admin/AdminApp';
import { HomePage } from './pages/HomePage';

function HomeWithIntro() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowIntro(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      {showIntro && (
        <div className="site-intro" aria-hidden="true">
          <div className="site-intro__content">
            <div className="site-intro__brand">Brenda Cat Sitter</div>
            <div className="site-intro__line" />
            <p className="site-intro__message">Ahora llego a más zonas 💚</p>
          </div>
        </div>
      )}
      <HomePage />
    </>
  );
}

export default function App() {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ContentProvider>
              <HomeWithIntro />
            </ContentProvider>
          }
        />
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
