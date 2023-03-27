import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/pick/main/Main";
import NavBar from "./components/common/navbar/NavBar";
import Footer from "./components/common/footer/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
