import styled from "styled-components";
import SearchTicket from "./elements/SearchTicket";
import WorldMap from "./elements/WorldMap";
import mainBanner from "../../../assets/image/mainBanner.png";

const Main = () => {
  return (
    <>
      <FistSection>
        <div className="greetings-section">
          <div>안녕하세요</div>
        </div>
        <div className="search-section">
          <SearchTicket />
        </div>
      </FistSection>
      <SecondSection>
        <WorldMap />
      </SecondSection>
      <ThirdSection>인기관광지</ThirdSection>
    </>
  );
};

const FistSection = styled.div`
  text-align: center;
  height: 400px;
  background: url(${mainBanner});
  background-size: cover;
  padding: 48px 0;
  margin-bottom: 48px;

  .greetings-section {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
      width: 1160px;
      height: 116px;
      color: #ffffff;
      margin-bottom: 44px;
    }
  }

  .search-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const SecondSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ThirdSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Main;
