import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import tempImg from "../../../../assets/image/mainBanner.png";
import { flight } from "../../../../apis/flight";

const TourList = (props) => {
  const [pageNum, setPageNum] = useState(0);
  const [tourList, setTourList] = useState([]);

  useEffect(() => {
    const data = props.tourContinent;

    const continentName =
      data === "South America"
        ? "samerica"
        : data === "North America"
        ? "namerica"
        : data === "Asia"
        ? "asia"
        : data === "Africa"
        ? "africa"
        : data === "Oceania"
        ? "oceania"
        : "europe";

    const getTourList = async (data) => {
      const res = await flight.get.tourist(data);
      setPageNum(0);
      setTourList(res.results);
    };

    getTourList(continentName);
  }, [props.tourContinent]);

  const pageHandler = (type) => {
    if (type === "prev") {
      if (+pageNum === +0) {
        return;
      }
      setPageNum(pageNum - 1);
    } else {
      console.log(pageNum, tourList.length);
      if (+pageNum === +parseInt((tourList.length - 1) / 10)) {
        return;
      }
      setPageNum(pageNum + 1);
    }
  };

  const clickTourItem = (item) => {
    props.setTourItem(item);
  };

  return (
    <>
      <TourListBox>
        <div className="list-header">
          <h2>인기 여행지</h2>
          <ul>
            <li>
              <input
                type="radio"
                id="europe"
                name="tour-continent"
                value="Europe"
                onChange={(e) => {
                  props.setTourContinent(e.target.value);
                }}
                defaultChecked
              />
              <label htmlFor="europe">유럽</label>
            </li>
            <li>
              <input
                type="radio"
                id="south-america"
                name="tour-continent"
                value="South America"
                onChange={(e) => {
                  props.setTourContinent(e.target.value);
                }}
              />
              <label htmlFor="south-america">남 아메리카</label>
            </li>
            <li>
              <input
                type="radio"
                id="north-america"
                name="tour-continent"
                value="North America"
                onChange={(e) => {
                  props.setTourContinent(e.target.value);
                }}
              />
              <label htmlFor="north-america">북 아메리카</label>
            </li>
            <li>
              <input
                type="radio"
                id="asia"
                name="tour-continent"
                value="Asia"
                onChange={(e) => {
                  props.setTourContinent(e.target.value);
                }}
              />
              <label htmlFor="asia">아시아</label>
            </li>
            <li>
              <input
                type="radio"
                id="africa"
                name="tour-continent"
                value="Africa"
                onChange={(e) => {
                  props.setTourContinent(e.target.value);
                }}
              />
              <label htmlFor="africa">아프리카</label>
            </li>
            <li>
              <input
                type="radio"
                id="oceania"
                name="tour-continent"
                value="Oceania"
                onChange={(e) => {
                  props.setTourContinent(e.target.value);
                }}
              />
              <label htmlFor="oceania">오세아니아</label>
            </li>
          </ul>
        </div>
        <div className="list-body">
          {pageNum !== 0 && (
            <button className="left-arrow" onClick={() => pageHandler("prev")}>
              <FaChevronLeft />
            </button>
          )}
          <ul>
            {tourList.slice(pageNum * 10, pageNum * 10 + 10).map((spot) => {
              return (
                <li
                  className="tour-item"
                  key={spot.id + spot.touristName}
                  onClick={() => clickTourItem(spot)}
                >
                  <img src={spot.imgUrl} alt={spot.touristName} />
                  <div>{spot.touristName}</div>
                </li>
              );
            })}
          </ul>
          {pageNum !== parseInt((tourList.length - 1) / 10) && (
            <button className="right-arrow" onClick={() => pageHandler("next")}>
              <FaChevronRight />
            </button>
          )}
        </div>
      </TourListBox>
    </>
  );
};

const TourListBox = styled.div`
  width: 1200px;
  margin: 40px 20px;

  .list-header {
    display: flex;
    flex-direction: column;
    align-items: start;

    h2 {
      font-weight: 700;
      font-size: 28px;
      text-align: center;
      color: #000000;
      margin: 0;
    }

    ul {
      display: flex;
      padding: 0;
      margin: 16px 8px;

      li {
        display: block;

        input[type="radio"] {
          display: none;
        }

        label {
          display: inline-flex;
          align-items: center;
          height: 32px;
          font-weight: 700;
          font-size: 16px;
          text-align: center;
          padding: 4px 12px;
          margin-right: 8px;
          border-radius: 16px;
          color: #000000;
          cursor: pointer;

          :hover {
            background: rgba(128, 72, 156, 0.2);
          }
        }

        input[type="radio"]:checked + label {
          color: #ffffff;
          background: #80489c;
        }
      }
    }
  }

  .list-body {
    width: 1100px;
    margin: 0 32px;
    display: flex;

    ul {
      height: 420px;
      display: flex;
      padding: 0;
      margin: 0;
      flex-direction: column;
      flex-wrap: wrap;
    }

    .tour-item {
      display: flex;
      flex-direction: column;
      width: 200px;
      height: 180px;
      margin: 0 24px 24px 0;
      border: 1px solid #d9d9d9;
      border-radius: 8px;
      box-sizing: border-box;
      cursor: pointer;

      img {
        width: 100%;
        height: 120px;
        border-radius: 7px 7px 0 0;
      }

      > div {
        width: 100%;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 15px;
      }

      :hover {
        box-shadow: 0px 0px 4px 2px gray;
      }
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      position: absolute;
      opacity: 0.4;
      border: none;
      cursor: pointer;

      :hover {
        opacity: 1;
      }
    }

    .left-arrow {
      transform: translate(-38px, 174px);

      svg {
        transform: translate(-2px, 0);
        width: 20px;
        height: 20px;
      }
    }

    .right-arrow {
      transform: translate(1104px, 174px);
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export default TourList;
