import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TodosPage from "./pages/TodosPage";
import DocumentsPage from "./pages/DocumentsPage";
import BillsPage from "./pages/BillsPage";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import AddItem from "./pages/AddItem";
import { useEffect, useRef, useState } from "react";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-50 min-h-screen overflow-y-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/todos" />} />
            <Route path="/todos" element={<TodosPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/bills" element={<BillsPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/add" element={<AddItem />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
