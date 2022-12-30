import React, { lazy } from "react";
import Home from "@/views/Home";
const Page1 = lazy(() => import("@/views/page"));
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
    element: <Navigate to="/page1" />,
  },
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/page1",
        element: withLoadingComponent(<Page1 />),
      },
    ],
  },
];

export default routes;
