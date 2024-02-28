import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import ErrorPage from "./Pages/ErrorPage";
import PizzaList from "./Pages/Menu";
import Layout from "./Layouts/UserLayout";
import Cart from "./Pages/Cart";
import Home from "./Pages/Home";

import PizzaCreator from './Pages/PizzaCreator';

import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <PizzaList />
      },
      {
        path: "/cart",
        element: <Cart />
      },
    ],
  },
  {
    path: "/admin",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <PizzaCreator />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
