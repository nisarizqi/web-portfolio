import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SoloHRISPage from './pages/SoloHRISPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/solohris" element={<SoloHRISPage />} />
    </Routes>
  );
}

export default App;
