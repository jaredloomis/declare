import React, { useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useAtom } from "jotai";

import { Navigation } from "./features/navigation/Navigation";
import { NotFound } from "./components/NotFound";
import { Sidebar } from "./features/navigation/Sidebar";
import { Tests } from "./features/test-creation/Tests";
import { LogIn } from "./features/auth/LogIn";
import { authToken } from "./features/auth/store";

export function App() {
  const [token, _] = useAtom(authToken);
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if not logged in
  useEffect(() => {
    if (!token && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [token, location.pathname]);

  return (
    <>
      <Navigation />
      <div className="h-full">
        <div className="flex h-full min-h-full">
          <Sidebar />
          <div className="flex-1 h-screen">
            <div className="container mx-auto p-10">
              <Routes>
                <Route path="/" Component={NotFound} />
                <Route path="/login" Component={LogIn} />
                <Route path="/tests" Component={Tests} />
                <Route path="/suites" Component={NotFound} />
                <Route path="*" Component={NotFound} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
