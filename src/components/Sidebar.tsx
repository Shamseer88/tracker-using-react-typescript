import { NavLink } from "react-router-dom";

const Sidebar = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const links = [
    { to: "/todos", label: "Todos" },
    { to: "/documents", label: "Documents" },
    { to: "/bills", label: "Bills" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/calendar", label: "Calendar" },
    { to: "/add", label: "Add an item" },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-8">Tracker</h1>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onLinkClick}
            className={({ isActive }) =>
              `text-lg ${
                isActive ? "text-yellow-400 font-semibold" : "text-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
