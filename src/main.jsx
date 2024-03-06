import React from "react";
import Modal from "react-modal";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import "@fontsource/inter"; // Defaults to weight 400
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";

import "react-toastify/dist/ReactToastify.css";

Modal.setAppElement("#root");

import App from "./App";
import { AuthProvider } from "./context/AuthContext";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="*" element={<App />} />)
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<div>Loading..</div>} />
    </AuthProvider>
  </React.StrictMode>
);
