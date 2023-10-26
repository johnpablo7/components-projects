import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="flex flex-col">
      <NavLink to="/react-hook-form">React Hook Form</NavLink>
      <NavLink to="/todos">Todos</NavLink>
    </div>
  );
};
