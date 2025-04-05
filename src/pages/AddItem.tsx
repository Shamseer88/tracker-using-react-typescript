import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

const AddItem = () => {
  const [type, setType] = useState("todo");
  const [form, setForm] = useState<any>({});
  const navigate = useNavigate();

  const handleSubmit = () => {
    const storageKey =
      type === "todo" ? "todos" : type === "bill" ? "bills" : "documents";
    const existing = JSON.parse(localStorage.getItem(storageKey) || "[]");
    const newItem = { ...form, id: uuid() };
    localStorage.setItem(storageKey, JSON.stringify([...existing, newItem]));
    navigate(`/${type}s`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Add New Item</h2>

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border rounded-xl p-2 w-full sm:w-1/2"
      >
        <option value="todo">Todo</option>
        <option value="bill">Bill</option>
        <option value="document">Document</option>
      </select>

      <div className="space-y-4">
        {(type === "todo" || type === "bill") && (
          <>
            <input
              type="text"
              placeholder="Title"
              className="w-full border p-2 rounded-xl"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
            <textarea
              placeholder="Description"
              className="w-full border p-2 rounded-xl"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
            <input
              type="date"
              className="w-full border p-2 rounded-xl"
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
            {type === "todo" && (
              <select
                className="w-full border p-2 rounded-xl"
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="todo">Todo</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
              </select>
            )}
            {type === "bill" && (
              <>
                <input
                  type="number"
                  placeholder="Amount"
                  className="w-full border p-2 rounded-xl"
                  onChange={(e) =>
                    setForm({ ...form, amount: +e.target.value })
                  }
                />
                <select
                  className="w-full border p-2 rounded-xl"
                  onChange={(e) =>
                    setForm({ ...form, paid: e.target.value === "true" })
                  }
                >
                  <option value="false">Unpaid</option>
                  <option value="true">Paid</option>
                </select>
              </>
            )}
          </>
        )}

        {type === "document" && (
          <>
            <input
              type="text"
              placeholder="Document Name"
              className="w-full border p-2 rounded-xl"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="url"
              placeholder="Google Drive Link"
              className="w-full border p-2 rounded-xl"
              onChange={(e) => setForm({ ...form, link: e.target.value })}
            />
            <input
              type="date"
              className="w-full border p-2 rounded-xl"
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </>
        )}

        <button
          className="bg-green-600 text-white px-6 py-2 rounded-xl mt-4"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddItem;
