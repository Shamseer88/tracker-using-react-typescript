import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import TodosPage from "./pages/TodosPage";
import DocumentsPage from "./pages/DocumentsPage";
import BillsPage from "./pages/BillsPage";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import CalendarPage from "./pages/CalendarPage";
import AddItem from "./pages/AddItem";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !(sidebarRef.current as any).contains(e.target)
      ) {
        setIsSidebarOpen(false);
      }
    };
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <Router>
      <div className="flex relative">
        <button
          className="md:hidden fixed right-4 top-4 z-50 bg-gray-900 text-white p-2 rounded"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰
        </button>

        <div
          ref={sidebarRef}
          className={`fixed md:static z-40 transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
        </div>

        {isSidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" />
        )}

        <main className="flex-1 p-6 bg-gray-50 min-h-screen overflow-y-auto ml-0 md:ml-4">
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
