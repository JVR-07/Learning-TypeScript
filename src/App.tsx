import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { PasswordValidator } from "./components/projects/PasswordValidator/PasswordValidator";
import { TaskManager } from "./components/projects/TaskManager/TaskManager";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project-1" element={<PasswordValidator />} />
      <Route path="/project-2" element={<TaskManager />} />
    </Routes>
  );
}

export default App;
