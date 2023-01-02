import React, { lazy } from "react";
import Home from "@/views/Home";
import { Navigate } from "react-router-dom";

// 懒加载
const withLoadingComponent = (comp: JSX.Element) => {
  return (
    <React.Suspense fallback={<div> Loading...</div>}>{comp}</React.Suspense>
  );
};

const routes = [
  {
    path: "/",
    element: <Navigate to="/" />,
  },
  {
    path: "/",
    element: <Home />,
  },
];

export default routes;
