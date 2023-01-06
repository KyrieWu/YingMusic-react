import { useEffect } from "react";
import { useRoutes, useNavigate, Outlet } from "react-router-dom";
import Header from "./components/Header";
import router from "./router";

function App() {
  const outlet = useRoutes(router);
  return (
    <div className="App">
      <Header />
      {outlet}
    </div>
  );
}

export default App;
