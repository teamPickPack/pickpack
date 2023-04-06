import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { flightAction } from "../../../../store/flightSlice";
import flightSearchImg from "../../../../assets/image/flight-search-img.png";
import airplaneImg from "../../../../assets/image/airplane-img.png";
import { relationOfAirport } from "./data/Relation";
import { SwitchSVG, CalendarSVG, ConditionSVG, CloseSVG } from "./SVG";
import { flight } from "../../../../apis/flight";
import { useLocation, useNavigate } from "react-router";
import store from "../../../../store/store";

const SearchTicket = (props) => {
  const dispatch = useDispatch();

  const [isCondition, setIsCondition] = useState(false);
  const [isSelecter, setIsSelecter] = useState(false);
  const [directLength, setDirectLength] = useState(1);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  const [selectedContinent, setSelectedContinent] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const flight = store.getState().flight;

  const [wayType, setWayType] = useState(flight.wayType);
  const [criterion, setCriterion] = useState(flight.criterion);
  const [departure, setDeparture] = useState(flight.departure);
  const [destination, setDestination] = useState(flight.destination);
  const [startDate, setStartDate] = useState(flight.startDate);
  const [endDate, setEndDate] = useState(flight.endDate);
  const [direct, setDirect] = useState(flight.direct);
  const [leftPrice, setLeftPrice] = useState(flight.leftPrice);
  const [rightPrice, setRightPrice] = useState(flight.rightPrice);
  const [minPrice, setMinPrice] = useState(flight.minPrice);
  const [maxPrice, setMaxPrice] = useState(flight.maxPrice);

  useEffect(() => {
    if (props.departure) {
      setDeparture(props.departure);
    }
  }, [props.departure]);

  useEffect(() => {
    if (props.destination) {
      setDestination(props.destination);
    }
  }, [props.destination]);

  const resetCondition = () => {
    setDirect([true, false, false, false]);
    setMinPrice(0);
    setLeftPrice(0);
    setMaxPrice(2000);
    setRightPrice(2000);
  };

  const range = useRef();
  const balloonLeft = useRef();
  const balloonRight = useRef();

  const leftPriceValid = (e) => {
    const valid = (maxPrice - minPrice) * 0.01;
    if (+rightPrice - +e.target.value <= valid) {
      if (maxPrice - minPrice < 100 && maxPrice !== minPrice) {
        setLeftPrice(+rightPrice - 1);
        e.target.value = +rightPrice - 1;
      } else {
        setLeftPrice(+rightPrice - +valid);
        e.target.value = +rightPrice - +valid;
      }
    } else if (+e.target.value < minPrice) {
      setLeftPrice(+minPrice);
      e.target.value = +minPrice;
    } else {
      setLeftPrice(+e.target.value);
    }

    balloonLeft.current.value = +e.target.value;

    const pixel = ((leftPrice - minPrice) / (maxPrice - minPrice)) * 408;

    range.current.style.transform = `translateX(${pixel}px)`;

    balloonLeft.current.style.transform = `translate(${
      -200 + pixel - pixel * 0.032
    }px,-22px)`;

    range.current.style.width = `${
      ((rightPrice - leftPrice) / (maxPrice - minPrice)) * 410
    }px`;
  };

  const rightPriceValid = (e) => {
    const valid = (maxPrice - minPrice) * 0.01;
    if (+e.target.value - +leftPrice <= valid) {
      if (maxPrice - minPrice < 100 && maxPrice !== minPrice) {
        setRightPrice(+leftPrice + 1);
        e.target.value = +leftPrice + 1;
      } else {
        setRightPrice(+leftPrice + +valid);
        e.target.value = +leftPrice + +valid;
      }
    } else if (+e.target.value > maxPrice) {
      setRightPrice(+maxPrice);
      e.target.value = +maxPrice;
    } else {
      setRightPrice(+e.target.value);
    }

    balloonRight.current.value = +e.target.value;

    const pixel = ((maxPrice - rightPrice) / (maxPrice - minPrice)) * 408;

    range.current.style.width = `${
      ((rightPrice - leftPrice) / (maxPrice - minPrice)) * 410
    }px`;

    balloonRight.current.style.transform = `translate(${
      200 - pixel + pixel * 0.032
    }px,-22px)`;
  };

  useEffect(() => {
    const leftPixel = ((leftPrice - minPrice) / (maxPrice - minPrice)) * 408;
    const rightPixel = ((maxPrice - rightPrice) / (maxPrice - minPrice)) * 408;

    balloonLeft.current.style.transform = `translate(${
      -200 + leftPixel - leftPixel * 0.032
    }px,-22px)`;

    balloonRight.current.style.transform = `translate(${
      200 - rightPixel + rightPixel * 0.032
    }px,-22px)`;

    balloonLeft.current.value = +leftPrice;
    balloonRight.current.value = +rightPrice;

    range.current.style.transform = `translateX(${leftPixel}px)`;
    range.current.style.width = `${
      ((rightPrice - leftPrice) / (maxPrice - minPrice)) * 410
    }px`;

    document.getElementById("left-range").value = +leftPrice;
    document.getElementById("right-range").value = +rightPrice;
    document.getElementById("min-price").value = +minPrice;
    document.getElementById("max-price").value = +maxPrice;
  }, [leftPrice, rightPrice]);

  const priceValid = (type, e) => {
    if (e.target.value < 0) {
      e.target.value = 0;
    }
    if (+e.target.value[0] === 0 && e.target.value.length > 1) {
      e.target.value = +e.target.value.substr(1, e.target.value.length);
    }
    if (e.target.value.length > 4) {
      e.target.value = +e.target.value.substr(0, 4);
    }

    if (type === "min") {
      if (+e.target.value > +maxPrice) {
        e.target.value = +maxPrice;
      }
      balloonLeft.current.value = +e.target.value;
      balloonRight.current.value = +maxPrice;
      setLeftPrice(+e.target.value);
      setMinPrice(+e.target.value);
      setRightPrice(maxPrice);
    } else {
      if (+e.target.value < +minPrice) {
        e.target.value = +minPrice;
      }
      balloonLeft.current.value = +minPrice;
      balloonRight.current.value = +e.target.value;
      setRightPrice(+e.target.value);
      setMaxPrice(+e.target.value);
      setLeftPrice(minPrice);
    }

    balloonLeft.current.style.display = "none";
    balloonRight.current.style.display = "none";
  };

  useEffect(() => {
    if (isCondition) {
      document.getElementById("condition-container").style.display = "block";
    } else {
      document.getElementById("condition-container").style.display = "none";
    }
  }, [isCondition]);

  useEffect(() => {
    if (wayType === "round") {
      document.getElementById("round").checked = true;
      document.querySelector(".center-div").style.width = "528px";
    } else {
      document.getElementById("one").checked = true;
      document.querySelector(".center-div").style.width = "488px";
      setEndDate("");
    }

    setIsCondition(false);
  }, [wayType]);

  const changePlace = () => {
    console.log('changeP')
    if (criterion === "departure") {
      setCriterion("destination");
      if (props.criterion) {
        props.setCriterion("destination");
      }
    } else {
      setCriterion("departure");
      if (props.criterion) {
        props.setCriterion("departure");
      }
    }

    const _temp = departure;
    setDeparture(destination);
    setDestination(_temp);
  };

  useEffect(() => {
    let length = 0;

    for (let index = 0; index < 4; index++) {
      if (direct[index]) {
        length++;
      }
    }

    if (length === 0) {
      setDirect([true, false, false, false]);
    }

    setDirectLength(length);
  }, [direct]);

  const navigator = useNavigate();
  const location = useLocation();

  const SearchTicketList = async () => {
    if (wayType === "one") {
      if (!departure.code | !destination.code | !startDate) {
        alert("출발지, 도착지, 출발일자를 선택해주세요");
        return;
      }
    } else {
      if (!departure.code | !destination.code | !startDate | !endDate) {
        alert("출발지, 도착지, 출발일자 ,도착일자를 선택해주세요");
        return;
      }
    }

    dispatch(flightAction.setWayType(wayType));
    dispatch(flightAction.setCriterion(criterion));
    dispatch(flightAction.setDeparture(departure));
    dispatch(flightAction.setDestination(destination));
    dispatch(flightAction.setStartDate(startDate));
    dispatch(flightAction.setEndDate(endDate));
    dispatch(flightAction.setDirect(direct));
    dispatch(flightAction.setLeftPrice(leftPrice));
    dispatch(flightAction.setRightPrice(rightPrice));
    dispatch(flightAction.setMinPrice(minPrice));
    dispatch(flightAction.setMaxPrice(maxPrice));

    if (location.pathname === "/pick/list") {
      window.location.reload();
    } else {
      navigator("/pick/list");
    }
  };

  console.log("crierion: " + criterion);

  return (
    <>
      <TicketBox>
        <TicketType>
          <div>
            <input
              id="one"
              name="wayType"
              type="radio"
              value="one"
              onClick={(e) => {
                resetCondition();
                setWayType(e.target.value);
              }}
            />
            <label htmlFor="one">편도</label>
            <input
              id="round"
              name="wayType"
              type="radio"
              value="round"
              onClick={(e) => {
                resetCondition();
                setWayType(e.target.value);
              }}
            />
            <label htmlFor="round">왕복</label>
          </div>
          <div className="filter-list">
            <span>
              {direct[0] && "직항/경유 전체"}
              {direct[1] && "직항"}
              {direct[2] && (direct[1] ? ", 경유 1회" : "경유 1회")}
              {direct[3] &&
                (directLength > 1 ? ", 경유 2회 이상" : "경유 2회 이상")}
            </span>
            <span>
              {(leftPrice * 10000)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원 ~{" "}
              {(rightPrice * 10000)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              원
            </span>
          </div>
        </TicketType>
        <TicketInner place={departure}>
          <div className="left-div">
            <PlaceInfo
              place={departure}
              cursor={criterion === "departure" ? "not-allowed" : "pointer"}
              onClick={() => {
                if (criterion !== "departure") {
                  setIsSelecter(true);
                }
              }}
            >
              <div className="info-header">
                <p>출발</p>
              </div>
              <div className="info-body">
                {departure.code ? (
                  <>
                    <div className="place-name">
                      {departure.name}
                      <br />
                      {departure.subName && departure.subName}
                    </div>
                    <div className="place-code">({departure.code})</div>
                  </>
                ) : (
                  <>
                    <div className="place-name">출발지</div>
                    <div className="place-code">선택</div>
                  </>
                )}
              </div>
            </PlaceInfo>
            <div className="switching-btn" onClick={changePlace}>
              <div>
                <img src={airplaneImg} alt="airplane-img" />
              </div>
              <SwitchSVG />
            </div>
            <PlaceInfo
              place={destination}
              cursor={criterion === "destination" ? "not-allowed" : "pointer"}
              onClick={() => {
                if (criterion !== "destination") {
                  setIsSelecter(true);
                }
              }}
            >
              <div className="info-header">
                <p>도착</p>
              </div>
              <div className="info-body">
                {destination.code ? (
                  <>
                    <div className="place-name">
                      {destination.name}
                      <br />
                      {destination.subName && destination.subName}
                    </div>
                    <div className="place-code">({destination.code})</div>
                  </>
                ) : (
                  <>
                    <div className="place-name">도착지</div>
                    <div className="place-code">선택</div>
                  </>
                )}
              </div>
            </PlaceInfo>
            {isSelecter && (
              <>
                <div
                  className="select-container"
                  onClick={() => {
                    setIsSelecter(false);
                    setSelectedContinent("");
                    setSelectedCountry("");
                  }}
                />
                <SelectContainer criterion={criterion}>
                  <div className="select-box">
                    <button
                      onClick={() => {
                        setIsSelecter(false);
                        setSelectedContinent("");
                        setSelectedCountry("");
                      }}
                    >
                      Ⅹ
                    </button>
                    <SelectSection
                      data={relationOfAirport}
                      type="continent"
                      selected={(data) => {
                        setSelectedContinent(data);
                        setSelectedCountry("");
                        const selectedItem = {
                          name: data.name_ko,
                          subName: "",
                          code: data.code,
                          lat: data.lat,
                          lng: data.lng,
                        };
                        if (criterion === "departure") {
                          setDestination(selectedItem);
                        } else {
                          setDeparture(selectedItem);
                        }
                      }}
                    />
                    {selectedContinent && (
                      <SelectSection
                        data={selectedContinent.countries}
                        type="country"
                        selected={(data) => {
                          console.log(data);
                          setSelectedCountry(data);
                          const selectedItem = {
                            name: data.name_ko,
                            subName: "",
                            code: data.code,
                            lat: data.lat,
                            lng: data.lng,
                          };
                          if (criterion === "departure") {
                            setDestination(selectedItem);
                          } else {
                            setDeparture(selectedItem);
                          }
                        }}
                      />
                    )}
                    {selectedCountry && (
                      <SelectSection
                        data={selectedCountry.airports}
                        type="airport"
                        selected={(data) => {
                          console.log(data);
                          const selectedItem = {
                            name: data.city,
                            subName: "",
                            code: data.code,
                            lat: data.lat,
                            lng: data.lng,
                          };
                          if (criterion === "departure") {
                            setDestination(selectedItem);
                          } else {
                            setDeparture(selectedItem);
                          }
                          setIsSelecter(false);
                          setSelectedContinent("");
                          setSelectedCountry("");
                        }}
                      />
                    )}
                  </div>
                </SelectContainer>
              </>
            )}
          </div>
          <div className="center-div">
            <DateButton id="start-date">
              <div className="date-btn">
                <CalendarSVG />
                <span className="date-info">
                  {startDate && startDate.substring(5, 7)}월{" "}
                  {startDate && startDate.substring(8, 10)}일
                </span>
                <input
                  type="date"
                  min={new Date().toISOString().substring(0, 10)}
                  max={
                    endDate ? endDate : maxDate.toISOString().substring(0, 10)
                  }
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                  defaultValue={startDate}
                />
              </div>
            </DateButton>
            {wayType === "round" && (
              <DateButton id="end-date">
                <div className="date-btn">
                  <CalendarSVG />
                  <span className="date-info">
                    {endDate && endDate.substring(5, 7)}월{" "}
                    {endDate && endDate.substring(8, 10)}일
                  </span>
                  <input
                    type="date"
                    min={
                      setStartDate
                        ? startDate
                        : new Date().toISOString().substring(0, 10)
                    }
                    max={maxDate.toISOString().substring(0, 10)}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                    }}
                    defaultValue={endDate}
                  />
                </div>
              </DateButton>
            )}
            <SearchCondition>
              <div
                className="condition-btn"
                onClick={() => {
                  setIsCondition(!isCondition);
                }}
              >
                <ConditionSVG />
                <span className="condition-text">검색조건</span>
              </div>
              <div id="condition-container">
                <div
                  className="condition-container"
                  onClick={() => setIsCondition(!isCondition)}
                />
                <ConditionBox id="condition-box">
                  <div className="condition-header">
                    <span>검색조건</span>
                    <button
                      onClick={() => {
                        setIsCondition(!isCondition);
                      }}
                    >
                      <CloseSVG />
                    </button>
                  </div>
                  <div className="condition-body">
                    <div className="condition-reset" onClick={resetCondition}>
                      초기화
                    </div>
                    <div className="stop-condition">
                      <h3>경유</h3>
                      <label htmlFor="all-route">
                        <input
                          id="all-route"
                          name="direct"
                          type="checkbox"
                          checked={direct[0]}
                          onChange={(e) => {
                            setDirect([e.target.checked, false, false, false]);
                          }}
                        />
                        <span>전체</span>
                      </label>
                      <label htmlFor="non-stop">
                        <input
                          id="non-stop"
                          name="direct"
                          type="checkbox"
                          checked={direct[1]}
                          onChange={(e) => {
                            const _direct = [...direct];
                            _direct[0] = false;
                            _direct[1] = e.target.checked;
                            setDirect(_direct);
                          }}
                        />
                        <span>직항</span>
                      </label>
                      <label htmlFor="1-stop">
                        <input
                          id="1-stop"
                          name="direct"
                          type="checkbox"
                          checked={direct[2]}
                          onChange={(e) => {
                            const _direct = [...direct];
                            _direct[0] = false;
                            _direct[2] = e.target.checked;
                            setDirect(_direct);
                          }}
                        />
                        <span>경유 1회</span>
                      </label>
                      <label htmlFor="2-more-stop">
                        <input
                          id="2-more-stop"
                          name="direct"
                          type="checkbox"
                          checked={direct[3]}
                          onChange={(e) => {
                            const _direct = [...direct];
                            _direct[0] = false;
                            _direct[3] = e.target.checked;
                            setDirect(_direct);
                          }}
                        />
                        <span>경유 2회 이상</span>
                      </label>
                    </div>
                    <div className="price-condition">
                      <h3>가격</h3>
                      <div className="slider">
                        <input
                          ref={balloonLeft}
                          type="number"
                          className="balloon-left"
                          onClick={() => {
                            balloonLeft.current.style.display = "block";
                          }}
                          onBlur={(e) => {
                            leftPriceValid(e);
                            balloonLeft.current.style.display = "none";
                          }}
                          defaultValue={leftPrice}
                        />
                        <input
                          type="range"
                          id="left-range"
                          min={minPrice}
                          max={maxPrice}
                          onFocus={() => {
                            balloonLeft.current.style.display = "block";
                          }}
                          onChange={leftPriceValid}
                          defaultValue={leftPrice}
                        />
                        <input
                          ref={balloonRight}
                          type="number"
                          className="balloon-right"
                          onClick={() => {
                            balloonRight.current.style.display = "block";
                          }}
                          onBlur={(e) => {
                            rightPriceValid(e);
                            balloonRight.current.style.display = "none";
                          }}
                          defaultValue={rightPrice}
                        />
                        <input
                          type="range"
                          id="right-range"
                          min={minPrice}
                          max={maxPrice}
                          onFocus={() => {
                            balloonRight.current.style.display = "block";
                          }}
                          onChange={rightPriceValid}
                          defaultValue={rightPrice}
                        />
                        <div className="track">
                          <div className="range" ref={range}></div>
                          <span className="first-point"></span>
                          <span className="second-point"></span>
                          <span className="third-point"></span>
                          <div>
                            <span className="min-price">
                              <label htmlFor="min-price">최소</label>
                              <input
                                id="min-price"
                                type="number"
                                onBlur={(e) => priceValid("min", e)}
                                defaultValue={minPrice}
                              />
                            </span>
                            <span className="price-point">
                              {parseInt(minPrice + (maxPrice - minPrice) / 4)
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                            <span className="price-point">
                              {parseInt(
                                minPrice + ((maxPrice - minPrice) * 2) / 4
                              )
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                            <span className="price-point">
                              {parseInt(
                                minPrice + ((maxPrice - minPrice) * 3) / 4
                              )
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            </span>
                            <span className="max-price">
                              <label htmlFor="max-price">최대</label>
                              <input
                                id="max-price"
                                type="number"
                                onBlur={(e) => priceValid("max", e)}
                                defaultValue={maxPrice}
                              />
                            </span>
                            <span className="amount-unit">(단위 : 만원)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ConditionBox>
              </div>
            </SearchCondition>
          </div>
          <div className="right-div">
            <button type="button" onClick={SearchTicketList}>
              <img src={flightSearchImg} alt="Flight-Search-Button" />
            </button>
          </div>
        </TicketInner>
      </TicketBox>
    </>
  );
};

const SelectSection = (props) => {
  console.log(props.data);
  return (
    <Section>
      {props.data.map((element) => {
        return (
          <div key={element.code}>
            <input
              id={element.code}
              name={props.type}
              type="radio"
              value={element.code}
              onClick={() => {
                props.selected(element);
              }}
            />
            <label htmlFor={element.code}>
              {element.name_ko ? element.name_ko : element.city}
            </label>
          </div>
        );
      })}
    </Section>
  );
};

const Section = styled.section`
  height: 246px;
  overflow-y: scroll;
  border: 1px solid #d9d9d9;
  ::-webkit-scrollbar {
    display: none;
  }

  label {
    width: 140px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-width: 0 0 1px 0;
    border-style: solid;
    border-color: #d9d9d9;
    font-size: 16px;
    font-weight: 600;
  }

  label:last-child {
    border-width: 0 0 1px 0;
  }

  input[type="radio"] {
    display: none;
  }

  input[type="radio"]:checked + label {
    background: black;
    color: white;
  }
`;

const TicketBox = styled.div`
  width: 1080px;
  background: #ffffff;
  box-sizing: border-box;
  border: 1px solid #3c64b1;
  border-radius: 8px;
`;

const TicketType = styled.div`
  height: 72px;
  box-sizing: border-box;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: #3c64b1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;

  div {
    display: flex;
  }

  input[type="radio"] {
    display: none;
  }

  label {
    width: 88px;
    height: 40px;
    border-radius: 16px;
    border: 0px;
    color: #000000;
    background: transparent;
    margin: 0 16px 0 0;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  label:hover {
    color: white;
    background: #432c7a;
    opacity: 0.8;
  }

  input[type="radio"]:checked + label {
    width: 88px;
    height: 40px;
    border-radius: 16px;
    border: 0px;
    color: #ffffff;
    background: #432c7a;
    margin: 0 16px 0 0;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    margin: 0 8px;
    background: rgba(67, 44, 122, 0.1);
    border-radius: 16px;
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #000000;
    height: 24px;
    padding: 8px 12px;
  }
`;

const TicketInner = styled.div`
  height: 120px;
  display: flex;
  padding: 20px;

  .left-div {
    width: 320px;
    heigth: 120px;
    margin-right: 24px;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .switching-btn {
      margin-bottom: 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;

      img {
        width: 40px;
        height: 40px;
        transition: all 0.6s cubic-bezier(0.18, 0.89, 0.32, 1.28) 0s;
      }

      :hover {
        opacity: 0.9;

        img {
          width: 44px;
          height: 44px;
        }
      }
    }

    .select-container {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }

  .center-div {
    width: 528px;
    margin-right: 40px;
    heigth: 120px;
    margin-right: 44px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    transition: all 0.2s ease;
  }

  .right-div {
    width: 96px;
    heigth: 120px;
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width: 96px;
      height: 96px;
      background: #ffdff4;
      border-radius: 20px;
      border: none;
      transition: all 0.2s ease;
      cursor: pointer;
    }
    button:hover {
      background: #ffc5ec;
    }

    img {
      width: 64px;
      height: 64px;
    }
  }
`;

const PlaceInfo = styled.div`
  height: 100%;
  min-width: 160px;
  font-weight: 600;
  color: #373f41;
  cursor: ${(props) => props.cursor};

  .info-header {
    display: flex;
    height: 32px;
    align-items: center;

    p {
      flex: 1;
      font-size: 20px;
    }
  }

  .info-body {
    .place-name {
      height: 32px;
      margin-top: ${(props) => (props.place.subName.length > 0 ? 8 : 16)}px;
      margin-bottom: ${(props) => (props.place.subName.length > 0 ? 8 : 0)}px;
      font-size: ${(props) =>
        props.place.name.length + props.place.subName.length > 6
          ? 18
          : props.place.name.length + props.place.subName.length > 4
          ? 20
          : 22}px;
      line-height: ${(props) => (props.place.subName.length > 0 ? 22 : 32)}px;
    }

    .place-code {
      height: 32px;
      font-size: 16px;
    }
  }
`;

const DateButton = styled.div`
  width: 176px;
  height: 48px;
  background: #fce2db;
  background: #fce2db;
  border-radius: 4px;
  padding: 0;
  color: #373f41;
  margin: 0 2px;

  .date-btn {
    width: 176px;
    height: 48px;
    border-radius: 4px;
  }
  input[type="date"] {
    width: 174px;
    height: 48px;
    color: transparent;
    background: transparent;
    border-radius: 4px;
    border: none;
    transform: translateY(-56px);
    transition: all 0.2s ease;

    :hover {
      background: rgba(97, 97, 97, 0.1);
    }
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    background: none;
    width: 174px;
    height: 48px;
    cursor: pointer;
  }

  .calendar-btn {
    width: 20px;
    height: 22px;
    transform: translate(-58px, 12px);

    path {
      fill: #373f41;
    }
  }

  .date-info {
    display: block;
    font-size: 20px;
    font-weight: 600;
    transform: translate(12px, -16px);
  }
`;

const SearchCondition = styled.div`
  width: 160px;
  height: 48px;
  background: rgba(255, 143, 177, 0.65);
  border-radius: 4px;
  padding: 0;
  color: #373f41;
  margin: 0 2px;

  .condition-btn {
    height: 48px;
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s ease;
    :hover {
      background: rgba(255, 143, 177, 0.65);
    }
  }

  .condition-svg {
    width: 20px;
    height: 22px;
    transform: translate(-58px, 13px);

    path {
      fill: #373f41;
    }
  }

  .condition-text {
    display: block;
    font-size: 20px;
    font-weight: 600;
    transform: translate(8px, -16px);
  }

  .condition-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

const ConditionBox = styled.div`
  width: 512px;
  height: 224px;
  background: #ffffff;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transform: translate(-144px, 2px);
  transition: all 0.2s ease;
  position: absolute;
  z-index: 1000;

  .condition-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px;
    height: 24px;
    font-size: 18px;
    font-weight: 700;
    border-style: solid;
    border-width: 0 0 1px 0;
    border-color: rgba(0, 0, 0, 0.1);

    button {
      font-size: 18px;
      font-weight: 700;
      background: none;
      cursor: pointer;
      border: none;

      path {
        border: 2px solid #6c6f75;
      }
    }
  }

  .condition-body {
    height: 168px;
    padding: 24px 24px;

    .condition-reset {
      position: absolute;
      transform: translate(430px, -20px);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;
      border-radius: 8px;
      padding: 2px;

      :hover {
        opacity: 0.8;
        color: #ffffff;
        background: #432c7a;
      }
    }

    .stop-condition {
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3 {
        font-size: 18px;
        font-weight: 700;
      }

      label {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: #616161;

        input[type="checkbox"] {
          -webkit-appearance: none;
          width: 22px;
          height: 22px;
          border: 1px solid #616161;
          border-radius: 6px;
          outline: none;
          margin-right: 8px;
        }

        input[type="checkbox"]:checked {
          background-color: #3c64b1;
          border-color: rgba(97, 97, 97, 0.5);
        }

        span {
          height: 28px;
        }
      }
    }

    .price-condition {
      height: 68px;
      margin-top: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3 {
        font-size: 18px;
        font-weight: 700;
      }

      .slider {
        width: 412px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        input[type="number"]::-webkit-inner-spin-button {
          appearance: none;
          -moz-appearance: none;
          -webkit-appearance: none;
        }

        .balloon-left {
          display: none;
          position: absolute;
          width: 72px;
          height: 20px;
          padding: 2px 2px 0px 2px;
          border-radius: 8px;
          transform: translate(-198px, -22px);
          background: #484848;
          border: 1px solid #484848;
          color: #ffffff;
          font-size: 12px;
          z-index: 20;
          text-align: center;
        }

        .balloon-right {
          display: none;
          position: absolute;
          width: 72px;
          height: 20px;
          padding: 2px 2px 0px 2px;
          border-radius: 8px;
          transform: translate(198px, -22px);
          background: #484848;
          border: 1px solid #484848;
          color: #ffffff;
          font-size: 12px;
          z-index: 20;
          text-align: center;
        }

        input[type="range"] {
          width: 412px;
          appearance: none;
          position: absolute;
          background: none;
          pointer-events: none;
          z-index: 10;
          opacity: 1;
        }

        input[type="range"]::-webkit-slider-thumb {
          border: 2px solid #1070c8;
          border-radius: 100%;
          background: #ffffff;
          appearance: none;
          pointer-events: all;
          width: 18px;
          height: 18px;
        }

        .track {
          width: 410px;
          height: 8px;
          background-color: #bdc3c7;
          border-radius: 24px;

          .min-price {
            font-size: 12px;
            font-weight: 600;

            label {
              width: 24px;
              position: absolute;
              transform: translate(-56px, -32px);
            }

            input[type="number"] {
              position: absolute;
              font-size: 12px;
              font-weight: 600;
              appearance: none;
              border: none;
              text-align: center;
              background: none;
              transform: translate(-76px, 6px);
              width: 60px;
            }
            input[type="number"]::-webkit-inner-spin-button {
              appearance: none;
              -moz-appearance: none;
              -webkit-appearance: none;
            }
          }

          .max-price {
            font-size: 12px;
            font-weight: 600;

            label {
              position: absolute;
              width: 24px;
              transform: translate(32px, -32px);
            }

            input[type="number"] {
              position: absolute;
              font-size: 12px;
              font-weight: 600;
              appearance: none;
              border: none;
              text-align: center;
              background: none;
              transform: translate(12px, 6px);
              width: 56px;
            }

            input[type="number"]::-webkit-inner-spin-button {
              appearance: none;
              -moz-appearance: none;
              -webkit-appearance: none;
            }
          }

          .price-point {
            display: inline-block;
            width: 60px;
            font-size: 12px;
            text-align: center;
            margin: 0 21.5px;
            transform: translateX(2px);
          }

          .amount-unit {
            position: absolute;
            font-size: 12px;
            font-weight: 600;
            transform: translate(0, 26px);
          }
        }

        .range {
          background-color: #1070c8;
          height: 8px;
          border-radius: 24px;
        }

        .first-point {
          display: block;
          position: absolute;
          transform: translate(105px, -8px);
          width: 2px;
          height: 8px;
          background: #d9d9d9;
          opacity: 0.5;
        }
        .second-point {
          display: block;
          position: absolute;
          transform: translate(204px, -8px);
          width: 2px;
          height: 8px;
          background: #d9d9d9;
          opacity: 0.5;
        }
        .third-point {
          display: block;
          position: absolute;
          transform: translate(304px, -8px);
          width: 2px;
          height: 8px;
          background: #d9d9d9;
          opacity: 0.5;
        }
      }
    }
  }
`;

const SelectContainer = styled.div`
  position: absolute;
  z-index: 1000;

  .select-box {
    position: absolute;
    display: flex;
    background: white;
    transform: translate(
      ${(props) => (props.criterion === "departure" ? "8" : "-192")}px,
      60px
    );
    padding: 24px 16px 16px 16px;
    border-radius: 16px;
    border: 1px solid #432c7a;

    button {
      position: absolute;
      right: 12px;
      top: 1px;
      font-size: 16px;
      background: none;
      border: none;
      cursor: pointer;

      :hover {
        opacity: 0.4;
      }
    }
  }
`;
export default SearchTicket;
