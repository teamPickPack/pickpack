import "./App.css";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/pick/main/Main";
import List from "./pages/pick/list/List";
import NavBar from "./components/common/navbar/NavBar";
import Footer from "./components/common/footer/Footer";
import PackMain from "./pages/pack/main/PackMain";
import styled from "styled-components";
import Pack from "./pages/pack/Pack";
import Buy from "./pages/pack/buy/Buy";
import Sell from "./pages/pack/sell/Sell";
import Borrow from "./pages/pack/borrow/Borrow";
import Rent from "./pages/pack/rent/Rent";
import Detail from "./pages/pack/detail/Detail";
import Regist from "./pages/pack/regist/Regist";
import Modify from "./pages/pack/modify/Modify";
import Mypage from "./pages/mypage/Mypage";

function App() {
  return (
    <div className="App">
      <NavBar />
      <MainContainer>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/pick/list" element={<List />} />
          <Route path="/pack" element={<Pack />}>
            <Route index element={<PackMain />} />
            <Route path="buy" element={<Buy />} />
            <Route path="sell" element={<Sell />} />
            <Route path="borrow" element={<Borrow />} />
            <Route path="rent" element={<Rent />} />
            <Route path="detail/:itemNo" element={<Detail />} />
            <Route path="regist" element={<Regist />} />
            <Route path="modify/:itemNo" element={<Modify />} />
          </Route>
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </MainContainer>
      <Footer />
    </div>
  );
}

const MainContainer = styled.div`
  min-height: calc(100% - 56px - 48px);
`;

export default App;
