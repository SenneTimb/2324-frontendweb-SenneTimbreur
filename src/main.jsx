import { ThemeProvider } from "./contexts/Theme.context";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import NotFound from "./components/NotFound";
import Layout from "./components/Layout";
import LedenList from "./pages/leden/LedenList";
import OuderList from "./pages/ouders/OudersList";
import HomePage from "./pages/HomePage";
import VoegLidToe from "./pages/leden/VoegLidToe";
import VoegOuderToe from "./pages/ouders/VoegOuderToe";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/Auth.context";
import PrivateRoute from "./components/PrivateRoute";
import Logout from "./pages/Logout";
import HuisartsenList from "./pages/huisartsen/HuisartsenList";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate replace to="/home" />,
      },
      {
        path: "/home",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <HomePage />,
          },
        ],
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/logout",
        element: <Logout />,
      },
      {
        path: "/ouders",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <OuderList />,
          },
          {
            path: "form",
            element: <VoegOuderToe />,
          },
        ],
      },
      {
        path: "/leden",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <LedenList />,
          },
          {
            path: "form",
            element: <VoegLidToe />,
          },
        ],
      },
      {
        path: "/huisartsen",
        element: <PrivateRoute />,
        children: [
          {
            index: true,
            element: <HuisartsenList />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
