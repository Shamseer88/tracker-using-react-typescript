import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { BaseItem, BillItem } from "../types";

const CalendarPage = () => {
  const [todos, setTodos] = useState<BaseItem[]>([]);
  const [bills, setBills] = useState<BillItem[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const t = localStorage.getItem("todos");
    const b = localStorage.getItem("bills");
    if (t) setTodos(JSON.parse(t));
    if (b) setBills(JSON.parse(b));
  }, []);

  const getEventsOnDate = (date: Date) => {
    const dStr = date.toISOString().split("T")[0];
    const todoEvents = todos.filter((t) => t.date === dStr);
    const billEvents = bills.filter((b) => b.lastDate === dStr);
    return { todoEvents, billEvents };
  };

  const tileContent = ({ date }: { date: Date }) => {
    const { todoEvents, billEvents } = getEventsOnDate(date);
    const count = todoEvents.length + billEvents.length;
    return count > 0 ? (
      <div className="text-xs text-white bg-blue-500 rounded-full w-5 h-5 mx-auto mt-1 flex items-center justify-center">
        {count}
      </div>
    ) : null;
  };

  const displayEvents = () => {
    if (!selectedDate) return null;
    const { todoEvents, billEvents } = getEventsOnDate(selectedDate);
    return (
      <div className="space-y-4 mt-4">
        {todoEvents.map((todo) => (
          <div
            key={todo.id}
            className="p-3 bg-blue-100 rounded-xl text-sm text-blue-800"
          >
            Todo: {todo.title}
          </div>
        ))}
        {billEvents.map((bill) => (
          <div
            key={bill.id}
            className="p-3 bg-green-100 rounded-xl text-sm text-green-800"
          >
            Bill: {bill.name}
          </div>
        ))}
        {todoEvents.length + billEvents.length === 0 && (
          <p className="text-sm text-gray-500">No events.</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Calendar</h2>
      <Calendar
        onClickDay={(date) => setSelectedDate(date)}
        tileContent={tileContent}
        className="rounded-xl shadow-lg p-4"
      />
      {selectedDate && (
        <div>
          <h3 className="text-xl font-semibold mt-6">
            Events on {selectedDate.toDateString()}
          </h3>
          {displayEvents()}
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
