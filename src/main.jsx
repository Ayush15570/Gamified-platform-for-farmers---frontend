import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './i18n';
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Pages & Components
import LandingPage from "./components/LandingPage.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Register.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import MyIssues from "./components/MyIssues.jsx";
import ReportIssue from "./components/ReportIssue.jsx";
import IssuesPage from "./pages/IssuesPage.jsx";

// Route protection
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import AdminRoute from "./utils/AdminRoute.jsx";
import Products from "./market/Products.jsx";
import Purchased from "./market/Purchased.jsx";
import AIReportIssue from "./components/AIReportIssue.jsx";
import AIIssuesPage from "./pages/AIIssuePage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App contains Header, Footer, Outlet
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOtp />,
      },

      // ✅ Protected (only logged-in users)
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-issues",
        element: (
          <ProtectedRoute>
            <MyIssues />
          </ProtectedRoute>
        ),
      },
      {
        path: "/issues",
        element: (
          <ProtectedRoute>
            <IssuesPage />
          </ProtectedRoute>
        ),
      },

      // ✅ Admin-only route
      {
        path: "/admin-dashboard",
        element: 
          
            <AdminDashboard />
         
        
      },
      {
        path:"/products",
        element:<Products/>
      },
      {
        path: "/purchased",
        element:<Purchased/>
      },
      {
        path:"/ai-issue",
        element:<AIIssuesPage/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);