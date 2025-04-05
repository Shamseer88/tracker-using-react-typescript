import { useEffect, useState } from "react";
import { BaseItem, Status } from "../types";
import { v4 as uuidv4 } from "uuid";

const statusColors: Record<Status, string> = {
  todo: "bg-red-200 text-red-800",
  doing: "bg-yellow-200 text-yellow-800",
  done: "bg-green-200 text-green-800",
};

const TodosPage = () => {
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [todos, setTodos] = useState<BaseItem[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  const [form, setForm] = useState({ title: "", description: "" });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!form.title.trim()) return;
    const newTodo: BaseItem = {
      id: uuidv4(),
      title: form.title,
      description: form.description,
      date: new Date().toISOString(),
      status: "todo",
    };
    setTodos([newTodo, ...todos]);
    setForm({ title: "", description: "" });
  };

  const updateStatus = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              status:
                todo.status === "todo"
                  ? "doing"
                  : todo.status === "doing"
                  ? "done"
                  : "todo",
            }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || todo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Todos</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl p-2 w-full sm:w-1/2"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-xl p-2 w-full sm:w-1/4"
        >
          <option value="all">All Statuses</option>
          <option value="todo">Todo</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h3 className="text-xl font-semibold">Add New Todo</h3>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full px-4 py-2 border rounded-xl"
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-2 border rounded-xl"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
        >
          Add Todo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white p-4 rounded-2xl shadow space-y-2 border"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-bold">{todo.title}</h4>
              <span
                className={`text-xs px-3 py-1 rounded-full ${
                  statusColors[todo.status]
                }`}
              >
                {todo.status.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-600">{todo.description}</p>
            <p className="text-xs text-gray-400">
              Last updated: {new Date(todo.date).toLocaleString()}
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => updateStatus(todo.id)}
                className="text-sm px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              >
                Next Status
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-sm px-4 py-1 rounded-full bg-red-100 text-red-800 hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodosPage;
