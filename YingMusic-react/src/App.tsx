import React from "react";
import { useRoutes, useLocation, useNavigate } from "react-router-dom";
import router from "./router";

const outlet = useRoutes(router);

function App() {
  return (
    <div>
      {outlet}
      App
    </div>
  );
}

export default App;
