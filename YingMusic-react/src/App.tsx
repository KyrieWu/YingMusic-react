import { useRoutes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./views/Footer";
import router from "./router";

function App() {
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
