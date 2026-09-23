// client/src/components/NavBar.jsx
import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      <div className="flex items-center gap-2">
        {/* Exercise 1: Brand Icon */}
        <svg
          className="w-6 h-6 text-indigo-600"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
        </svg>
        <span className="font-bold text-lg">Inkwell</span>
      </div>
      <div className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm ${
              isActive ? "font-semibold text-indigo-600" : "text-gray-600"
            }`
          }
        >
          Feed
        </NavLink>
        <NavLink
          to="/write"
          className={({ isActive }) =>
            `text-sm ${
              isActive ? "font-semibold text-indigo-600" : "text-gray-600"
            }`
          }
        >
          Write
        </NavLink>
      </div>
    </nav>
  );
}