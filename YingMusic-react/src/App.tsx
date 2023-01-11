import { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./views/Footer";
import router from "./router";
import { changeAppearance } from "@/utils/common";

function App() {
  useEffect(() => {
    changeAppearance("light");
  }, []);
  const outlet = useRoutes(router);
  return (
    <div className="App">
      <Header />
      {outlet}
      <Footer />
    </div>
  );
}

export default App;
