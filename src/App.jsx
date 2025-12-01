import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import authService from "./utils/authService";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import FloatingAIButton from "./components/FloatingAIbutton";
import AIModal from "./components/AIModal";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation(); // ✅ To detect current route
const [openAI, setOpenAI] = useState(false);
const authStatus = useSelector((state) => state.auth.status)
  useEffect(() => {
    authService
      .getCurrentUser()
      .then((user) => {
        if (user) dispatch(login(user));
        else dispatch(logout());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;

  // ✅ Hide Header & Footer for admin routes
  const isAdminRoute = location.pathname.startsWith("/Admin-dashboard");

 return (
  <div className="min-h-screen flex bg-gray-100">
    
  

    <div className="flex-1 flex flex-col ">
      {!isAdminRoute && <Header />}

      <main className="flex-grow w-full">
        <Outlet />
      </main>

      { !isAdminRoute && <Footer />}
              { authStatus &&!isAdminRoute && (
          <FloatingAIButton openModal={() => setOpenAI(true)} />
        )}

        {/* AI MODAL */}
        <AIModal
          isOpen={openAI}
          closeModal={() => setOpenAI(false)}
          
        />

    </div>

  </div>
);

}

export default App;
