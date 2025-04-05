import { useEffect, useState } from "react";
import { BillItem } from "../types";
import { v4 as uuidv4 } from "uuid";

const BillsPage = () => {
  const [paidFilter, setPaidFilter] = useState("all");
  const [sortByDate, setSortByDate] = useState("none");
  const [bills, setBills] = useState<BillItem[]>(() => {
    const stored = localStorage.getItem("bills");
    return stored ? JSON.parse(stored) : [];
  });
  const [form, setForm] = useState({
    name: "",
    amount: "",
    lastDate: "",
  });

  useEffect(() => {
    localStorage.setItem("bills", JSON.stringify(bills));
  }, [bills]);

  const addBill = () => {
    if (!form.name || !form.amount || !form.lastDate) return;

    const newBill: BillItem = {
      id: uuidv4(),
      name: form.name,
      amount: parseFloat(form.amount),
      lastDate: form.lastDate,
      createdMonth: new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      }),
      paid: false,
    };

    setBills([newBill, ...bills]);
    setForm({ name: "", amount: "", lastDate: "" });
  };

  const togglePaid = (id: string) => {
    setBills((prev) =>
      prev.map((b) => (b.id === id ? { ...b, paid: !b.paid } : b))
    );
  };

  const deleteBill = (id: string) => {
    setBills((prev) => prev.filter((b) => b.id !== id));
  };

  const filteredBills = bills
    .filter((bill) =>
      paidFilter === "all"
        ? true
        : paidFilter === "paid"
        ? bill.paid
        : !bill.paid
    )
    .sort((a, b) => {
      if (sortByDate === "asc") return a.lastDate.localeCompare(b.lastDate);
      if (sortByDate === "desc") return b.lastDate.localeCompare(a.lastDate);
      return 0;
    });

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Bills</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <select
          value={paidFilter}
          onChange={(e) => setPaidFilter(e.target.value)}
          className="border rounded-xl p-2 w-full sm:w-1/2"
        >
          <option value="all">All Bills</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
        <select
          value={sortByDate}
          onChange={(e) => setSortByDate(e.target.value)}
          className="border rounded-xl p-2 w-full sm:w-1/2"
        >
          <option value="none">No Sort</option>
          <option value="asc">Sort by Date ↑</option>
          <option value="desc">Sort by Date ↓</option>
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 space-y-4">
        <h3 className="text-xl font-semibold">Add New Bill</h3>
        <input
          type="text"
          placeholder="Bill Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-xl"
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="w-full px-4 py-2 border rounded-xl"
        />
        <input
          type="date"
          value={form.lastDate}
          onChange={(e) => setForm({ ...form, lastDate: e.target.value })}
          className="w-full px-4 py-2 border rounded-xl"
        />
        <button
          onClick={addBill}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
        >
          Add Bill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBills.map((bill) => (
          <div
            key={bill.id}
            className="bg-white p-4 rounded-2xl shadow space-y-2 border"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-bold text-gray-800">{bill.name}</h4>
              <span
                className={`text-sm px-3 py-1 rounded-full ${
                  bill.paid
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {bill.paid ? "PAID" : "NOT PAID"}
              </span>
            </div>
            <p className="text-gray-600">Amount: ₹{bill.amount}</p>
            <p className="text-gray-600">
              Last Date: {new Date(bill.lastDate).toLocaleDateString()}
            </p>
            <p className="text-xs text-gray-400">
              Created: {bill.createdMonth}
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => togglePaid(bill.id)}
                className="text-sm px-4 py-1 rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              >
                Toggle Paid
              </button>
              <button
                onClick={() => deleteBill(bill.id)}
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

export default BillsPage;
