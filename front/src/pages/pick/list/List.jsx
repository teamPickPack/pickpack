import WeatherList from "./elements/WeatherList";
import OneWayTicket from "./elements/OneWayTicket";
import RoundTicket from "./elements/RoundTicket";
import SearchTicket from "../main/elements/SearchTicket";
import CompareModal from "./elements/CompareModal";
import mainBanner from "../../../assets/image/mainBanner.png";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { compareAction } from "../../../store/compareSlice";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import styled from "styled-components";
import { createPortal } from "react-dom";
import { flight } from "../../../apis/flight";

export default function List() {

  const {
    wayType,
    criterion,
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

  const [pageLoading, setPageLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(null);
  const accessToken = useSelector((state) => {
    return state.user.accessToken;
  });

  const [data, setData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortType, setSortType] = useState('price');
  const [orderBy, setOrderBy] = useState('asc');
  const handleSortType = (event) => {
    if(event.target.value === 'chg') {
      setOrderBy('desc');
    } else{
       setOrderBy('asc');
    }
    setSortType(event.target.value);
  }

  useEffect(() => {
    const getFlightList = async () => {
      if (wayType === "one") {
        if (!departure.code | !destination.code | !startDate) {
          setPageLoading(false);
          return;
        }

        setPageLoading(true);

        const data = {
          filter: {
            direct: direct,
            maxPrice: rightPrice * 10000,
            minPrice: leftPrice * 10000,
          },
          info: {
            departure: departure.code,
            destination: destination.code,
            date: startDate,
          },
          pageable: {
            orderBy,
            page: currentPage,
            sortType,
          },
        };
        const response = (await flight.post.one(data));
        // console.log(response);
        setData(response.ticketList);
        setTotalCount(response.totalCount);
        setPageLoading(false);
      } else {
        if (!departure.code | !destination.code | !startDate | !endDate) {
          setPageLoading(false);
          return;
        }

        setPageLoading(true);

        const data = {
          info: {
            departure: departure.code,
            destination: destination.code,
            depDate: startDate,
            arrDate: endDate,
          },
          filter: {
            direct: direct,
            maxPrice: rightPrice * 10000,
            minPrice: leftPrice * 10000,
          },
          pageable: {
            orderBy,
            page: 0,
            sortType,
          },
        };


        const response = await flight.post.round(data);
        if(currentPage > 0) setCurrentPage(0);
        // console.log(response);
        setData(response.ticketList);
        setTotalCount(response.totalCount);
        setPageLoading(false);
      }
    };

    getFlightList();
  }, [accessToken, sortType]);
  const [getLoading, setGetLoading] = useState(false);
  const [loadingPossible, setLoadingPossible] = useState(true);
  useEffect(() => {
    if(currentPage > 0){
      setGetLoading(true);
      const getFlightList = async () => {
        if (wayType === "one") {
          if (!departure.code | !destination.code | !startDate) {
            return;
          }
  
          const data = {
            filter: {
              direct: direct,
              maxPrice: rightPrice * 10000,
              minPrice: leftPrice * 10000,
            },
            info: {
              departure: departure.code,
              destination: destination.code,
              date: startDate,
            },
            pageable: {
              orderBy: "asc",
              page: currentPage,
              sortType,
            },
          };
          const response = (await flight.post.one(data));
          // console.log(response);
          if(response.ticketList.length === 0) setLoadingPossible(false);
          setData((data) => [...data, ...response.ticketList]);
        } else {
          if (!departure.code | !destination.code | !startDate | !endDate) {
            return;
          }

          const data = {
            info: {
              departure: departure.code,
              destination: destination.code,
              depDate: startDate,
              arrDate: endDate,
            },
            filter: {
              direct: direct,
              maxPrice: rightPrice * 10000,
              minPrice: leftPrice * 10000,
            },
            pageable: {
              orderBy,
              page: currentPage,
              sortType,
            },
          };
  
          const response = await flight.post.round(data);
          // console.log(response);
          if(response.ticketList.length  === 0) {
            setLoadingPossible(false);
          }
          setData((data) => [...data, ...response.ticketList]);
          setGetLoading(false);
        }
      };
  
      getFlightList();
    }
  }, [currentPage]);
  const dispatch = useDispatch();
  const compareList = useSelector((state) => {
    return state.compare.compareList;
  });
  const compareMode = useSelector((state) => {
    return state.compare.compareMode;
  });

  const handleLikeData = (ticketId, value) => {
    if (wayType === "one") {
      for (let i = 0; i < data.length; i++) {
        if (data[i].ticket.id === ticketId) {
          data[i].isLike = value;
          break;
        }
      }
    } else {
      for (let i = 0; i < data.length; i++) {
        if (
          `${data[i].goWay.id}-${data[i].returnWay.id}` ===
          ticketId
        ) {
          data[i].like = value;
          break;
        }
      }
    }
  };

  const [compareBoxVisible, setCompareBoxVisible] = useState(false);
  const [ticketListWidth, setTicketListWidth] = useState(window.innerWidth);
  useEffect(() => {
    //새로 compareBox를 띄울 때
    if (!compareBoxVisible && compareList.length > 0) {
      //현재 너비가 너무 작으면 minWidth에 맞춰
      setTicketListWidth(window.innerWidth - 320);
      setCompareBoxVisible(true);
    } else if (compareBoxVisible && compareList.length === 0) {
      setTicketListWidth((ticketListWidth) => ticketListWidth + 320);
      setCompareBoxVisible(false);
    }
  }, [compareList, compareBoxVisible, ticketListWidth]);

  const initialCheck = (mode, ticketId) => {
    //체크에 관련해서..
    let result = false;
    if (mode !== compareMode) return result;
    for (let i = 0; i < compareList.length; i++) {
      if (compareList[i].flightId === ticketId) {
        result = true;
        break;
      }
    }
    return result;
  };
  const [compareModalVisible, setCompareModalVisible] = useState(false);
  const handleCompareModalVisible = (type) => {
    if (type === "button") {
      setCompareModalVisible((compareModalVisible) => !compareModalVisible);
    } else {
      if (compareModalVisible) {
        setCompareModalVisible(false);
      } else {
        return;
      }
    }
  };
  const [compareBoxTop, setCompareBoxTop] = useState(160);

  const [compareBoxHeight, setCompareBoxHeight] = useState(
    window.innerHeight - 160
  );
  
  // ---------------------- 무한 스크롤 부분.. ----------------------------
  const [timer, setTimer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!timer) return;
    const debounce = setTimeout(() => {
      setCurrentPage((currentPage) => currentPage + 1);
      setTimer(false);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(debounce);
  }, [timer]);

  const InfinityScroll = () => {
    const totalHeight = document.body.scrollHeight - 200;
    const scrollPoint = window.scrollY + window.innerHeight;

    if (totalHeight > scrollPoint) return;

    if (timer) return;
    setTimer(true);
    setIsLoading(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", InfinityScroll);

    return () => {
      window.removeEventListener("scroll", InfinityScroll);
    };
  }, [setCurrentPage]);
  // ---------------------- 무한 스크롤 부분.. ----------------------------

  // const scrollUp = () => {
  //     window.scrollTo({top:0, left:0, behavior: 'smooth'});
  // }
  const checkHeight = () => {
    if (window.scrollY > 160) {
      setCompareBoxTop(0);
      setCompareBoxHeight(window.innerHeight);
    } else {
      setCompareBoxTop(160 - window.scrollY);
      setCompareBoxHeight(window.innerHeight - compareBoxTop);
    }
  };
  window.addEventListener("scroll", checkHeight);

  return (
    <>
      {pageLoading ? (
        <div
          style={{
            position: "fixed",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 1001,
            background: "white",
          }}
        >
          로딩중입니다..
        </div>
      ) : (
        <>
          {compareModalVisible && (
            <CompareModal
              handleCompareModalVisible={handleCompareModalVisible}
            />
          )}
          {compareModalVisible &&
            createPortal(<Background />, document.getElementById("background"))}
          <div
            onClick={() => handleCompareModalVisible("body")}
            style={{ minWidth: "1200px" }}
          >
            <FistSection style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <SearchTicket />
            </FistSection>
            <Content flexStyle={compareBoxVisible}>
              {compareBoxVisible ? (
                <CompareBox height={compareBoxHeight} top={compareBoxTop}>
                  <CompareBoxBtnList>
                    <CompareBoxBtnItem
                      onClick={() => handleCompareModalVisible("button")}
                      color="#FCE2DB"
                      width={120}
                    >
                      <span>항공권 비교하기</span>
                    </CompareBoxBtnItem>
                    <CompareBoxBtnItem
                      color="#FF0000"
                      width={64}
                      onClick={() =>
                        window.confirm("비교 목록을 초기화하시겠습니까?")
                          ? dispatch(compareAction.deleteCompareList())
                          : null
                      }
                    >
                      <span>초기화</span>
                    </CompareBoxBtnItem>
                  </CompareBoxBtnList>
                  {compareList.map((compareItem) => {
                    return (
                      <div key={compareItem.flightId}>
                        {compareItem.mode === "oneWay" ? (
                          <CompareItem scale={0.5}>
                            <OneWayTicket
                              className="compare-oneWay"
                              fromCompare={true}
                              isRound={false}
                              handleLikeData={handleLikeData}
                              isCheck={true}
                              isLike={compareItem.isLike}
                              ticket={compareItem.flightData.ticket}
                              flightList={compareItem.flightData.flightList}
                            />
                          </CompareItem>
                        ) : (
                          <CompareItem scale={0.4}>
                            <RoundTicket
                              className="compare-round"
                              fromCompare={true}
                              handleLikeData={handleLikeData}
                              isCheck={true}
                              isLike={compareItem.isLike}
                              goWay={compareItem.flightData[0].ticket}
                              returnWay={compareItem.flightData[1].ticket}
                              totalPrice={compareItem.totalPrice}
                            />
                          </CompareItem>
                        )}
                      </div>
                    );
                  })}
                </CompareBox>
              ) : null}
              <div style={{ margin: "20px auto" }}>
                <AdditionalInfo>
                  <WeatherList className="weather-list" />
                  <SearchInfo
                    className="search-info"
                    flexStyle={compareBoxVisible}
                  >
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        marginRight: "16px",
                      }}
                    >
                      {totalCount > 0 ? `${totalCount.toLocaleString('ko-kr')}개의 결과` : `검색 결과가 없습니다.`}
                    </span>
                    {data && <div>
                      <label style={{ fontSize: "16px", fontWeight: "600" }}>
                        정렬{" "}
                      </label>
                      <select onChange={handleSortType} value={sortType} style={{ fontSize: "16px", fontWeight: "600" }}>
                        <option value="price">금액낮은순</option>
                        <option value="chg">변동폭큰순</option>
                        <option value="depTime">출발시간빠른순</option>
                        {/* <option value="">출발시간늦은순</option> */}
                        <option value="totalTimeNum">소요시간낮은순</option>
                      </select>
                    </div>}
                  </SearchInfo>
                </AdditionalInfo>
                <TicketList
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "24px 0px",
                  }}
                >
                  {wayType === 'one' && data ? 
                    data.map((one) => {
                      if(one.ticket !== undefined){
                        one.isCheck = initialCheck('oneWay', one.ticket.id);
                        return(
                          <OneWayTicket key={one.ticket.id} fromCompare={false} isRound={false} handleLikeData={handleLikeData} 
                          isCheck={one.isCheck} isLike={one.like} ticket={one.ticket} />
                      )
                    }}) : null
                  }
                  {wayType === 'round' && data ?
                    data.map((one, index) => {
                      if(one.goWay !== undefined) {
                        one.isCheck = initialCheck(
                        "round",
                        `${one.goWay.id}-${one.returnWay.id}`
                      );
                      return (
                        <RoundTicket
                          key={`${one.goWay.id}-${one.returnWay.id}-${index}`}
                          fromCompare={false}
                          handleLikeData={handleLikeData}
                          isCheck={one.isCheck}
                          isLike={one.like}
                          goWay={one.goWay}
                          returnWay={one.returnWay}
                          totalPrice={one.totalPrice}
                        />
                      );
                    }
                      }
                      ) : null}
                </TicketList>
                {(loadingPossible && getLoading) ? <LoadingSpinner><AiOutlineLoading3Quarters className="spinner" size={48}/></LoadingSpinner> : null}
              </div>
              {(compareBoxVisible && ticketListWidth > 880) ||
                (compareBoxVisible && ticketListWidth > 1200)}
              {/* <UpBtn onClick={scrollUp}>
                        <FaChevronUp />
                        <span>TOP</span>
                    </UpBtn> */}
            </Content>
          </div>
        </>
      )}
    </>
  );
}

const FistSection = styled.div`
  text-align: center;
  height: 200px;
  background: url(${mainBanner});
  background-size: cover;
  padding: 48px 0px;

  .search-section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: ${(props) => (props.flexStyle ? "none" : "center")};
  min-width: 1200px;
  position: relative;
`;
const TicketList = styled.div`
  width: ${(props) => props.ticketListWidth}px;
`;

const CompareBox = styled.div`
  width: 320px;
  height: ${(props) => props.height}px;
  background-color: #e9e7ef;
  position: sticky;
  top: ${(props) => props.top}px;
`;
const CompareItem = styled.div`
  transform: scale(${(props) => props.scale});
  transform-origin: top left;
  height: 128px;
  .compare-oneWay {
    height: 120px;
  }

  .compare-round {
    height: 128px;
    background-color: red;
  }
`;

const CompareBoxBtnList = styled.div`
  display: flex;
  justify-content: space-around;
  width: 320px;
  padding: 16px 0px;
`;
const CompareBoxBtnItem = styled.div`
  border-radius: 8px;
  width: ${(props) => props.width}px;
  background-color: ${(props) => props.color};
  height: 24px;
  font-size: 12px;
  font-weight: bold;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  &:nth-child(2) {
    color: white;
  }
  &:hover {
    opacity: 0.7;
    cursor: pointer;
  }
`;

const AdditionalInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  min-width: 880px;
  .weather-list {
    justify-content: flex-start;
    border: 1px solid purple;
    padding: 0px 20px;
  }
  .search-info {
    justify-content: flex-end;
    padding: 0px 10px;
  }
`;

const SearchInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
`;

const UpBtn = styled.div`
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 50px;
  height: 50px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #e9e7ef;
    color: white;
    cursor: pointer;
  }
`;
const Background = styled.div`
  position: fixed;
  z-index: 50;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
`;

const LoadingSpinner = styled.span`
    margin-bottom: -4px;
    margin-left: 8px;
    .spinner {
        animation: rotate 2s infinite linear;
        @keyframes rotate {
            from{
                transform: rotate(0deg);
            }
            to{
                transform: rotate(360deg);
            }
        }
    }
`;