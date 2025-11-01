import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <div data-theme="synthwave" className="min-h-screen">
      <main className="max-w-7xl mx-auto p-4 mt-6">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
