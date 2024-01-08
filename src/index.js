import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LoginPage from "./pages/Login/LoginPage";
import "react-toastify/dist/ReactToastify.css";
import "rsuite/dist/rsuite.min.css";

import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import {
  AuthenticatedRoutes,
  ProtectRoutes,
} from "./config/protectedRoutes.jsx";
import store from "./store/store";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectRoutes />}>
          <Route path='/*' element={<DashboardPage />} />
        </Route>
        <Route element={<AuthenticatedRoutes />}>
          <Route path='/login' element={<LoginPage />} />
        </Route>
      </Routes>
      <ToastContainer
        // style={{ fontWeight: 500, color: "black" }}
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
