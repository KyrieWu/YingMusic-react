import React, { lazy } from "react";
import Home from "@/views/Home";
import Discover from "@/views/Discover";
import Library from "@/views/Library";
import { Navigate } from "react-router-dom";

// 懒加载
const withLoadingComponent = (comp: JSX.Element) => {
  return (
    <React.Suspense fallback={<div> Loading...</div>}>{comp}</React.Suspense>
  );
};

const routes = [
  {
    path: "*",
    element: <Navigate to="/" />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/library",
    element: <Library />,
  },
  {
    path: "/discover",
    element: <Discover />,
  },
];

export default routes;
