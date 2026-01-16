import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { PasswordValidator } from "./components/projects/PasswordValidator/PasswordValidator";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project-1" element={<PasswordValidator />} />
    </Routes>
  );
}

export default App;
