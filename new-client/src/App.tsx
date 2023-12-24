import React from "react";
import { createBrowserRouter, HashRouter, Route, Routes } from "react-router-dom";

import { Navigation } from "./features/navigation/Navigation";
import { NotFound } from "./components/NotFound";
import { Sidebar } from "./features/navigation/Sidebar";
import { Tests } from "./features/core/Tests";
import { LogIn } from "./features/auth/LogIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NotFound />,
  },
  {
    path: "/tests",
    element: <Tests />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export function App() {
  return (
    <HashRouter>
      <Navigation />
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <div className="container mx-auto p-10">
            <Routes>
              <Route path="/" Component={NotFound} />
              <Route path="/login" Component={LogIn} />
              <Route path="/tests" Component={Tests} />
              <Route path="/suites" Component={NotFound} />
            </Routes>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}
