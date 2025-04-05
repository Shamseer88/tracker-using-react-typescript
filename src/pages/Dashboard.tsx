import { useEffect, useState } from "react";
import { DocumentItem, BaseItem, BillItem } from "../types";

const Dashboard = () => {
  const [todos, setTodos] = useState<BaseItem[]>([]);
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [bills, setBills] = useState<BillItem[]>([]);

  useEffect(() => {
    const t = localStorage.getItem("todos");
    const d = localStorage.getItem("documents");
    const b = localStorage.getItem("bills");
    if (t) setTodos(JSON.parse(t));
    if (d) setDocs(JSON.parse(d));
    if (b) setBills(JSON.parse(b));
  }, []);

  const paidBills = bills.filter((b) => b.paid).length;
  const unpaidBills = bills.length - paidBills;

  const cardClass =
    "bg-white shadow p-6 rounded-2xl text-center space-y-2 border";

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={cardClass}>
          <h3 className="text-lg font-medium text-gray-600">Todos</h3>
          <p className="text-4xl font-bold text-blue-600">{todos.length}</p>
        </div>
        <div className={cardClass}>
          <h3 className="text-lg font-medium text-gray-600">Documents</h3>
          <p className="text-4xl font-bold text-green-600">{docs.length}</p>
        </div>
        <div className={cardClass}>
          <h3 className="text-lg font-medium text-gray-600">Bills Paid</h3>
          <p className="text-4xl font-bold text-teal-600">{paidBills}</p>
        </div>
        <div className={cardClass}>
          <h3 className="text-lg font-medium text-gray-600">Bills Unpaid</h3>
          <p className="text-4xl font-bold text-red-600">{unpaidBills}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
