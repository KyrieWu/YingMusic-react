import { useRoutes } from "react-router-dom";
import Header from "./components/Header";
import router from "./router";

function App() {
  //const outlet = useRoutes(router);
  return (
    <div style={{ background: "#ccc " }}>
      <Header />
      {/* {outlet} */}
      App
    </div>
  );
}

export default App;
