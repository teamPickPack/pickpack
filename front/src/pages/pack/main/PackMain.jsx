import styled from "styled-components";
import borrowImg from "../../../assets/image/borrow.jpg";
import lendImg from "../../../assets/image/lend.jpg";
import buyImg from "../../../assets/image/buy.jpg";
import sellImg from "../../../assets/image/sell.jpg";
import { Link } from "react-router-dom";

const PackMain = () => {
  return (
    <MainContainer>
      <Greetings>
        <div className="greeting-top">
          당신의 소중한 여행,
          <br /> <span>아맞다</span>를 통해 준비해보세요 !
        </div>
        <div className="greeting-bottom">
          필요한 여행 물품을 <span>구매/대여</span>하여, 나만의 완벽한 여행을
          준비하고,
          <br />
          여행을 마쳤다면, <span>판매/대여</span>를 통해 여행의 마무리를
          지어보세요 !
        </div>
      </Greetings>
      <MenuContainer>
        <Link to="/pack/buy">
          <MenuItem img={buyImg}>
            <span>살게요</span>
          </MenuItem>
        </Link>
        <Link to="/pack/sell">
          <MenuItem img={sellImg}>
            <span>팔게요</span>
          </MenuItem>
        </Link>
        <Link to="/pack/borrow">
          <MenuItem img={borrowImg}>
            <span>빌려주세요</span>
          </MenuItem>
        </Link>
        <Link to="/pack/lend">
          <MenuItem img={lendImg}>
            <span>빌려드려요</span>
          </MenuItem>
        </Link>
      </MenuContainer>
    </MainContainer>
  );
};

export default PackMain;

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: calc(100vh - 160px);
  margin: 0 28px;
`;

const Greetings = styled.div`
  text-align: start;
  font-weight: 700;

  .greeting-top {
    font-size: 36px;
    height: 112px;

    span {
      background: linear-gradient(
        180deg,
        #ff8fb1 14.29%,
        #80489c 49.73%,
        #432c7a 80.36%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
  }
  .greeting-bottom {
    height: 52px;
    font-size: 18px;
    margin: 0px 8px;

    span {
      color: red;
    }
  }
`;

const MenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 508px;
  height: 508px;
`;

const MenuItem = styled.div`
   {
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => `url(${props.img})`};
    background-position: center;
    background-size: cover;
    width: 240px;
    height: 240px;
    border: 1px solid black;
    border-radius: 8px;
    opacity: 0.8;
    cursor: pointer;
    transition: all 0.2s ease;
    background-position: center;
    background-size: cover;

    :hover {
      box-shadow: 0px 0px 8px 8px #d9d9d9;
      opacity: 1;
    }

    span {
      position: absolute;
      font-weight: 700;
      font-size: 24px;
      text-shadow: -1px 0 #000000, 0 1px #000000, 1px 0 #000000, 0 -1px #000000;
      color: #ffffff;
    }
  }
`;
