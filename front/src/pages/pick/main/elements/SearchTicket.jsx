import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { flightAction } from "../../../../store/flightSlice";
import flightSearchImg from "../../../../assets/image/flight-search-img.png";
import airplaneImg from "../../../../assets/image/airplane-img.png";

const SearchTicket = () => {
  const dispatch = useDispatch();

  const [isCondition, setIsCondition] = useState(false);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  const {
    wayType,
    departure,
    destination,
    startDate,
    endDate,
    direct,
    leftPrice,
    rightPrice,
    minPrice,
    maxPrice,
  } = useSelector((state) => {
    return state.flight;
  });

  const setWayType = (data) => {
    dispatch(flightAction.setWayType(data));
  };
  const setDeparture = (data) => {
    dispatch(flightAction.setDeparture(data));
  };
  const setDestination = (data) => {
    dispatch(flightAction.setDestination(data));
  };
  const setStartDate = (data) => {
    dispatch(flightAction.setStartDate(data));
  };
  const setEndDate = (data) => {
    dispatch(flightAction.setEndDate(data));
  };
  const setDirect = (data) => {
    dispatch(flightAction.setDirect(data));
  };
  const setLeftPrice = (data) => {
    dispatch(flightAction.setLeftPrice(data));
  };
  const setRightPrice = (data) => {
    dispatch(flightAction.setRightPrice(data));
  };
  const setMinPrice = (data) => {
    dispatch(flightAction.setMinPrice(data));
  };
  const setMaxPrice = (data) => {
    dispatch(flightAction.setMaxPrice(data));
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

    console.log(leftPrice, rightPrice);
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
      document.getElementById("condition-box").style.display = "block";
    } else {
      document.getElementById("condition-box").style.display = "none";
    }
  }, [isCondition]);

  console.log(wayType);

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
    setDirect("all");
    setMinPrice(0);
    setLeftPrice(0);
    setMaxPrice(2000);
    setRightPrice(2000);
  }, [wayType]);

  useEffect(() => {
    if (direct === "all") {
      document.getElementById("all-route").checked = true;
    } else if (direct === "0") {
      document.getElementById("non-stop").checked = true;
    } else if (direct === "1") {
      document.getElementById("1-stop").checked = true;
    } else {
      document.getElementById("2-more-stop").checked = true;
    }
  });

  const changePlace = () => {
    const _temp = departure;
    setDeparture(destination);
    setDestination(_temp);
  };

  const SearchTicketList = () => {
    console.log(
      "유효성 검사.. 왕복이면 도착일이 있는지... 지역 잘들어 가있는지..."
    );
    console.log("항공권 검색하고 싶습니다");
    return;
  };

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
                setWayType(e.target.value);
              }}
            />
            <label htmlFor="round">왕복</label>
          </div>
          <div className="filter-list">
            <span>
              {direct === "all"
                ? "직항/경유 전체"
                : direct === "0"
                ? "직항"
                : direct === "1"
                ? "경유 1회"
                : "경유 2회 이상"}
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
            <PlaceInfo place={departure}>
              <div className="info-header">
                <p>출발</p>
              </div>
              <div className="info-body">
                <div className="place-name">
                  {departure.name}
                  <br />
                  {departure.subName && departure.subName}
                </div>
                <div className="place-code">({departure.code})</div>
              </div>
            </PlaceInfo>
            <div className="switching-btn" onClick={changePlace}>
              <div>
                <img src={airplaneImg} alt="airplane-img" />
              </div>
              <SwitchSVG />
            </div>
            <PlaceInfo place={destination}>
              <div className="info-header">
                <p>도착</p>
              </div>
              <div className="info-body">
                <div className="place-name">
                  {destination.name}
                  <br />
                  {destination.subName && destination.subName}
                </div>
                <div className="place-code">({destination.code})</div>
              </div>
            </PlaceInfo>
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
                    console.log(e);
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
                  <div className="stop-condition">
                    <h3>경유</h3>
                    <label htmlFor="all-route">
                      <input
                        id="all-route"
                        name="direct"
                        type="radio"
                        value="all"
                        onClick={(event) => {
                          setDirect(event.target.value);
                        }}
                      />
                      <span>전체</span>
                    </label>
                    <label htmlFor="non-stop">
                      <input
                        id="non-stop"
                        name="direct"
                        type="radio"
                        value="0"
                        onClick={(event) => {
                          setDirect(event.target.value);
                        }}
                      />
                      직항
                    </label>
                    <label htmlFor="1-stop">
                      <input
                        id="1-stop"
                        name="direct"
                        type="radio"
                        value="1"
                        onClick={(event) => {
                          setDirect(event.target.value);
                        }}
                      />
                      경유 1회
                    </label>
                    <label htmlFor="2-more-stop">
                      <input
                        id="2-more-stop"
                        name="direct"
                        type="radio"
                        value="2"
                        onClick={(event) => {
                          setDirect(event.target.value);
                        }}
                      />
                      경유 2회 이상
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

const SwitchSVG = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.9862 0.467999L27.4525 6.8609C28.1258 7.4373 28.1781 8.3447 27.6093 8.9726L27.4542 9.12339L19.9879 15.5315C19.2594 16.1567 18.0775 16.1574 17.348 15.5329C16.6747 14.9566 16.6223 14.049 17.1912 13.4212L17.3463 13.2703L21.6219 9.60109L1.86658 9.60111C0.909343 9.60111 0.120395 8.98348 0.0125622 8.18779L0 8.00119C0 7.18071 0.720576 6.50447 1.6489 6.41204L1.86658 6.40128L21.635 6.40126L17.348 2.73182C16.6747 2.15538 16.6225 1.24788 17.1914 0.619991L17.3465 0.469199C18.019 -0.107843 19.0778 -0.152689 19.8104 0.334982L19.9862 0.467999ZM27.9813 23.8138L27.994 24.0003C27.994 24.8209 27.2734 25.497 26.3451 25.5895L26.1275 25.6002H6.37191L10.6535 29.2682C11.3266 29.8447 11.3789 30.7521 10.8099 31.3801L10.6546 31.5308C9.98211 32.1079 8.92336 32.1527 8.19084 31.6649L8.01492 31.5319L0.548588 25.1382C-0.124594 24.5617 -0.176858 23.6543 0.392169 23.0264L0.547357 22.8756L8.01368 16.47C8.74229 15.8449 9.92415 15.8444 10.6535 16.4689C11.3266 17.0453 11.3789 17.9528 10.8099 18.5808L10.6546 18.7315L6.37938 22.4004H26.1275C27.0846 22.4004 27.8736 23.0181 27.9813 23.8138Z"
        fill="#212121"
      />
    </svg>
  );
};

const CalendarSVG = () => {
  return (
    <svg
      fill="none"
      className="calendar-btn"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.25 3.875C0.25 2.97754 0.977537 2.25 1.875 2.25H18.125C19.0225 2.25 19.75 2.97754 19.75 3.875V20.125C19.75 21.0225 19.0225 21.75 18.125 21.75H1.875C0.977537 21.75 0.25 21.0225 0.25 20.125V3.875ZM18.125 3.875H1.875V20.125H18.125V3.875Z"
        fill="#BBBBBB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.875 0.625C15.3237 0.625 15.6875 0.988769 15.6875 1.4375V4.6875C15.6875 5.13623 15.3237 5.5 14.875 5.5C14.4263 5.5 14.0625 5.13623 14.0625 4.6875V1.4375C14.0625 0.988769 14.4263 0.625 14.875 0.625Z"
        fill="#BBBBBB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.125 0.625C5.57373 0.625 5.9375 0.988769 5.9375 1.4375V4.6875C5.9375 5.13623 5.57373 5.5 5.125 5.5C4.67627 5.5 4.3125 5.13623 4.3125 4.6875V1.4375C4.3125 0.988769 4.67627 0.625 5.125 0.625Z"
        fill="#BBBBBB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.25 7.9375C0.25 7.48877 0.613769 7.125 1.0625 7.125H18.9375C19.3862 7.125 19.75 7.48877 19.75 7.9375C19.75 8.38623 19.3862 8.75 18.9375 8.75H1.0625C0.613769 8.75 0.25 8.38623 0.25 7.9375Z"
        fill="#BBBBBB"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.2476 11.4428C14.5553 11.7694 14.54 12.2836 14.2134 12.5914L9.47046 17.0601C9.15674 17.3557 8.66681 17.3549 8.3541 17.0582L5.78457 14.6207C5.45902 14.3119 5.44546 13.7976 5.75428 13.4721C6.06311 13.1465 6.57738 13.133 6.90293 13.4418L8.91518 15.3506L13.0991 11.4086C13.4257 11.1009 13.9399 11.1162 14.2476 11.4428Z"
        fill="#BBBBBB"
      />
    </svg>
  );
};

const ConditionSVG = () => {
  return (
    <svg
      width="4"
      height="20"
      viewBox="0 0 4 20"
      className="condition-svg"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 3.07696C1.60444 3.07696 1.21776 2.98673 0.888861 2.81768C0.559963 2.64863 0.303617 2.40835 0.152242 2.12723C0.000866562 1.84611 -0.0387401 1.53677 0.0384303 1.23834C0.115601 0.939902 0.306083 0.665771 0.585788 0.450611C0.865493 0.23545 1.22186 0.0889247 1.60982 0.0295621C1.99778 -0.0298004 2.39992 0.000666594 2.76537 0.11711C3.13082 0.233554 3.44318 0.430745 3.66294 0.683746C3.8827 0.936748 4 1.2342 4 1.53848C4 1.94651 3.78929 2.33783 3.41421 2.62635C3.03914 2.91487 2.53043 3.07696 2 3.07696Z"
        fill="#373F41"
      />
      <path
        d="M2 11.5389C1.60444 11.5389 1.21776 11.4486 0.888861 11.2796C0.559963 11.1105 0.303617 10.8703 0.152242 10.5891C0.000866562 10.308 -0.0387401 9.99869 0.0384303 9.70025C0.115601 9.40182 0.306083 9.12769 0.585788 8.91253C0.865493 8.69737 1.22186 8.55084 1.60982 8.49148C1.99778 8.43211 2.39992 8.46258 2.76537 8.57902C3.13082 8.69547 3.44318 8.89266 3.66294 9.14566C3.8827 9.39866 4 9.69611 4 10.0004C4 10.4084 3.78929 10.7997 3.41421 11.0883C3.03914 11.3768 2.53043 11.5389 2 11.5389Z"
        fill="#373F41"
      />
      <path
        d="M2 19.9998C1.60444 19.9998 1.21776 19.9096 0.888861 19.7405C0.559963 19.5715 0.303617 19.3312 0.152242 19.0501C0.000866562 18.769 -0.0387401 18.4596 0.0384303 18.1612C0.115601 17.8628 0.306083 17.5886 0.585788 17.3735C0.865493 17.1583 1.22186 17.0118 1.60982 16.9524C1.99778 16.8931 2.39992 16.9235 2.76537 17.04C3.13082 17.1564 3.44318 17.3536 3.66294 17.6066C3.8827 17.8596 4 18.157 4 18.4613C4 18.8694 3.78929 19.2607 3.41421 19.5492C3.03914 19.8377 2.53043 19.9998 2 19.9998Z"
        fill="#373F41"
      />
    </svg>
  );
};

const CloseSVG = () => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 1L1 13"
        stroke="#6C6F75"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 1L13 13"
        stroke="#6C6F75"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

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
    font-size: 14px;
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
    width: 308px;
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
          width: 48px;
          height: 48px;
        }
      }
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
  // width: 160px;
  height: 100%;
  font-weight: 600;
  color: #373f41;
  font-family: "Mulish";

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
    cursor: pointer;
    .place-name {
      height: 32px;
      margin-top: ${(props) => (props.place.subName.length > 0 ? 8 : 16)}px;
      margin-bottom: ${(props) => (props.place.subName.length > 0 ? 8 : 0)}px;
      font-size: ${(props) =>
        props.place.name.length + props.place.subName.length > 5 ? 20 : 24}px;
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
    background: transparent;
    border-radius: 4px;
    border: none;
    transform: translateY(-52px);
    transition: all 0.2s ease;

    :hover {
      background: rgba(97, 97, 97, 0.1);
      .date-btn: red;
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

        input[type="radio"] {
          -webkit-appearance: none;
          width: 22px;
          height: 22px;
          border: 1px solid #616161;
          border-radius: 6px;
          outline: none;
          margin-right: 8px;
        }

        input[type="radio"]:checked {
          background-color: #3c64b1;
          border-color: rgba(97, 97, 97, 0.5);
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
export default SearchTicket;
