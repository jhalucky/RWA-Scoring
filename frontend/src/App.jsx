import React, { useState } from 'react';
import LandingPage from './components/LandingPage.jsx';
import RwaScoringFrontend from './components/RwaScoringFrontend.jsx';

function App() {
  const [showApp, setShowApp] = useState(false);

  if (showApp) {
    return <RwaScoringFrontend onBackToHome={() => setShowApp(false)} />;
  }

  return <LandingPage onLaunchApp={() => setShowApp(true)} />;
}

export default App;