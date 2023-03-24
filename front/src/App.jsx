import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/pick/main/Main";
import List from "./pages/pick/list/List";
import NavBar from "./components/common/navbar/NavBar";
import Footer from "./components/common/footer/Footer";

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pick/list" element={<List />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
