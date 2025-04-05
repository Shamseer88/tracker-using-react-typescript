import { useEffect, useState } from "react";
import { DocumentItem } from "../types";
import { v4 as uuidv4 } from "uuid";

const DocumentsPage = () => {
  const [sortByName, setSortByName] = useState(false);
  const [docs, setDocs] = useState<DocumentItem[]>(() => {
    const stored = localStorage.getItem("documents");
    return stored ? JSON.parse(stored) : [];
  });

  const [form, setForm] = useState({ name: "", link: "" });

  useEffect(() => {
    localStorage.setItem("documents", JSON.stringify(docs));
  }, [docs]);

  const addDoc = () => {
    if (!form.name.trim() || !form.link.trim()) return;
    const newDoc: DocumentItem = {
      id: uuidv4(),
      name: form.name,
      link: form.link,
    };
    setDocs([newDoc, ...docs]);
    setForm({ name: "", link: "" });
  };

  const deleteDoc = (id: string) => {
    setDocs((prev) => prev.filter((doc) => doc.id !== id));
  };

  const sortedDocs = [...docs];
  if (sortByName) {
    sortedDocs.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Documents</h2>

      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-xl"
          onClick={() => setSortByName((prev) => !prev)}
        >
          {sortByName ? "Clear Sort" : "Sort A-Z"}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h3 className="text-xl font-semibold">Add New Document</h3>
        <input
          type="text"
          placeholder="Document Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-xl"
        />
        <input
          type="url"
          placeholder="Google Drive Link"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="w-full px-4 py-2 border rounded-xl"
        />
        <button
          onClick={addDoc}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
        >
          Add Document
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white p-4 rounded-2xl shadow space-y-2 border"
          >
            <h4 className="text-xl font-bold text-gray-800">{doc.name}</h4>
            <a
              href={doc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Open in Drive
            </a>
            <div className="mt-2">
              <button
                onClick={() => deleteDoc(doc.id)}
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

export default DocumentsPage;
