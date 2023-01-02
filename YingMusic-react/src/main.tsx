import ReactDOM from "react-dom/client";
import "reset-css";
import "@/assets/styles/global.scss";
import App from "./App";

// 路由
import { BrowserRouter } from "react-router-dom";

//状态管理
import { Provider } from "react-redux";
//import store from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // <Provider store={store}>

  // </Provider>
);
