import React from "react";
import ReactDOM from "react-dom/client";

import "reset-css";
import "@/assets/styles/global.scss";
// 引入国际化解决方案
import "@/locale";
import App from "./App";

// 路由
import { BrowserRouter } from "react-router-dom";

//状态管理
import { Provider } from "react-redux";
//import store from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>

  // <Provider store={store}>

  // </Provider>
);
