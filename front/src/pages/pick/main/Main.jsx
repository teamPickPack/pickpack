import styled from "styled-components";
import SearchTicket from "./elements/SearchTicket";
import WorldMap from "./elements/WorldMap";
import mainBanner from "../../../assets/image/mainBanner.png";
import TourList from "./elements/TourList";
import { useState } from "react";
import store from "../../../store/store";

const Main = () => {
  const flight = store.getState().flight;

  const [tourItem, setTourItem] = useState(null);
  const [tourContinent, setTourContinent] = useState("Europe");
  const [departure, setDeparture] = useState(null);
  const [destination, setDestination] = useState(null);
  const [criterion, setCriterion] = useState(flight.criterion);

  return (
    <>
      <FirstSection>
        {/* <div className="greetings-section">
          <div>안녕하세요</div>
        </div> */}
        <div className="search-section">
          <SearchTicket
            departure={departure}
            destination={destination}
            criterion={criterion}
            setCriterion={setCriterion}
          />
        </div>
      </FirstSection>
      <SecondSection>
        <WorldMap
          tourItem={tourItem}
          tourContinent={tourContinent}
          setDeparture={setDeparture}
          setDestination={setDestination}
          criterion={criterion}
        />
      </SecondSection>
      <ThirdSection>
        <TourList
          setTourItem={setTourItem}
          setTourContinent={setTourContinent}
          tourContinent={tourContinent}
        />
      </ThirdSection>
    </>
  );
};

const FirstSection = styled.div`
  text-align: center;
  height: 200px;
  background: url(${mainBanner});
  background-size: cover;
  padding: 48px 0;
  margin-bottom: 48px;
  display: flex;
  align-items: center;
  justify-content: center;

  .greetings-section {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
      width: 1200px;
      margin: 0 20px;
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
  // display: inline-flex;
  // width: 1200px;
  // align-items: center;
  // justify-content: center;
  // flex-direction: column;
`;

const ThirdSection = styled.div`
  display: flex;

  height: 600px;
  justify-content: center;
`;

export default Main;
