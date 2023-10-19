import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/pages/dashboard/DashboardLayout";
import { Home } from "./components/pages/landing/home/Home";
import { HookForm } from "./components/pages/auth/forms/HookForm";
import { NotFound } from "./components/pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<DashboardLayout />}>
          <Route path="" element={<Home />} />
          <Route path="react-hook-form" element={<HookForm />} />
        </Route>

        <Route path="*" element={<NotFound linkTo="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
