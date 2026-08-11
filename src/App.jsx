import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SoloHRISPage from "./pages/SoloHRISPage";
import ChatbotWidget from "./components/chatbot/ChatbotWidget";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/solohris" element={<SoloHRISPage />} />
      </Routes>
      <ChatbotWidget />
    </>
  );
}

export default App;
