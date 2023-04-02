import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ItemPreview from "../../../components/pack/common/ItemPreview";

const DETAIL_DUMMY = {
  itemId: 9,
  memberId: 2,
  title: "태극기랑 사진 찍으실 분",
  category: "SELL",
  price: 15000,
  itemName: "태극기",
  imgUrl:
    "https://pickpack8.s3.ap-northeast-2.amazonaws.com/item/15bbbef4-4c8f-4057-bc63-cd061d625dbd%ED%83%9C%EA%B7%B9%EA%B8%B0.jpg",
  registDate: "2023-03-31 14:02",
  isComplete: false,
  cityId: 44,
  cityName: "세부",
};

const Detail = () => {
  const navigator = useNavigate();

  const timeAgo = (datetimeString) => {
    const datetime = new Date(datetimeString.replace(/-/g, "/"));
    const seconds = Math.floor((new Date() - datetime) / 1000);

    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval + "년 전";
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval + "달 전";
    }

    interval = Math.floor(seconds / 604800);
    if (interval >= 1) {
      return interval + "주 전";
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval + "일 전";
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval + "시간 전";
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval + "분 전";
    }

    return "방금 전";
  };

  const categoryName = (category) => {
    if (category === "BUY") {
      return "살게요";
    }
    if (category === "SELL") {
      return "팔게요";
    }
    if (category === "BORROW") {
      return "빌려주세요";
    }
    if (category === "RENT") {
      return "빌려드려요";
    }
  };

  const setPriceFormat = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <DetailContainer>
      <DetailInner>
        <div className="inner-top">
          <div className="image-box">
            <img src={DETAIL_DUMMY.imgUrl} alt={DETAIL_DUMMY.itemName} />
            <button className="left-arrow">
              <FaChevronLeft />
            </button>
            <button className="right-arrow">
              <FaChevronRight />
            </button>
          </div>
          <div className="control-box">
            <div className="left-div">닉네임</div>
            <div className="right-div">
              <button>채팅하기</button>
              <input id="like" type="checkbox" />
              <label htmlFor="like">
                찜하기
                <LikeSVG />
              </label>
              <button
                onClick={() => {
                  navigator(`pack/modify/${DETAIL_DUMMY.itemId}`);
                }}
              >
                수정하기
              </button>
            </div>
          </div>
          <div className="info-box">
            <div className="left-div">
              <h2>제목</h2>
              <div>
                작성일ㆍ{timeAgo(DETAIL_DUMMY.registDate)}{" "}
                <span className="tag-span">세부</span>
              </div>
            </div>
            <div className="right-div">
              <div className="category-div">
                {categoryName(DETAIL_DUMMY.category)}
              </div>
              <div className="price-div">
                {setPriceFormat(DETAIL_DUMMY.price)}원
              </div>
            </div>
          </div>
          <div className="content-box">
            <pre>{`반갑습니다. 반갑습니다. 반갑습니다. 반갑습니다. 
강호동입니다.
행복하세요.반갑습니다. 
강호동입니다.
행복하세요.반갑습니다. 
강호동입니다.
행복하세요.반갑습니다. 
강호동입니다.
행복하세요.`}</pre>
          </div>
        </div>
        <div className="inner-bottom">
          <p>닉네임 님의 다른 게시글</p>
          <div className="another-list">
            <ItemPreview item={DETAIL_DUMMY} />
            <ItemPreview item={DETAIL_DUMMY} />
          </div>
        </div>
      </DetailInner>
    </DetailContainer>
  );
};

const LikeSVG = () => {
  return (
    <svg
      width="20"
      height="22"
      viewBox="-2 -2 22 22"
      fill="#f0f0f0"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.9954 0C17.7607 0 20 2.50959 20 5.6032C20 9.82981 17.1524 12.6835 13.608 16.2356C12.4535 17.3924 11.2252 18.6234 9.99726 20C8.77117 18.6256 7.54507 17.3964 6.39275 16.2411C2.84719 12.6865 0 9.83203 0 5.60325C0 2.50964 2.23927 5.13519e-05 4.99863 5.13519e-05C7.49772 5.13519e-05 8.74749 1.40098 9.99726 4.20232C11.2466 1.40098 12.4963 0 14.9954 0Z"
        stroke="#f0f0f0"
      />
    </svg>
  );
};

const DetailContainer = styled.div`
  margin: 40px;
  display: flex;
  justify-content: center;
`;

const DetailInner = styled.div`
  width: 680px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  .inner-top {
    .image-box {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 100%;
        height: 500px;
        border-radius: 8px;
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
        transform: translate(-368px, 0);
        svg {
          transform: translate(-2px, 0);
          width: 20px;
          height: 20px;
        }
      }

      .right-arrow {
        transform: translate(368px, 0);
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }

    .control-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 24px;
      height: 64px;
      background: #ffffff;
      border: 2px solid #d9d9d9;
      border-width: 0 0 2px 0;

      .left-div {
        font-weight: 600;
        font-size: 16px;
        line-height: 18px;
        margin: 0;
      }

      .right-div {
        display: flex;

        button {
          background: #fce2db;
          border: none;
          font-weight: 600;
          font-size: 16px;
          border-radius: 8px;
          padding: 6px 12px;
          cursor: pointer;

          :hover {
            opacity: 0.7;
          }
        }

        input[type="checkbox"] {
          display: none;
        }

        label {
          font-weight: 600;
          font-size: 16px;
          display: inline-flex;
          align-items: center;
          margin-left: 8px;
          cursor: pointer;
          display: flex;
          // align-items: center;
        }

        input[type="checkbox"]:checked + label {
          svg {
            fill: #ff7979;
            path {
              stroke: none;
            }
          }
        }
      }
    }

    .info-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      height: 48px;
      background: #ffffff;
      font-weight: 600;
      font-size: 16px;

      .left-div {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        h2 {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }

        .tag-span {
          padding: 2px 12px;
          background: #ff8fb1;
          color: #ffffff;
          border-radius: 8px;
          border: none;
          margin-left: 8px;
        }
      }

      .right-div {
        .category-div {
          font-size: 18px;
        }

        .price-div {
          font-size: 20px;
        }
      }
    }

    .content-box {
      padding: 16px 16px 24px 16px;
      background: #ffffff;
      border: 2px solid #d9d9d9;
      border-width: 0 0 2px 0;

      pre {
        min-height: 200px;
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        text-align: left;
        white-space: pre-wrap;
      }
    }
  }

  .inner-bottom {
    padding: 24px 16px;

    p {
      display: flex;
      margin: 0;
      font-size: 16px;
      font-weight: 600;
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: center;

      li {
        margin: 24px 12px;
      }
    }
  }
`;

export default Detail;
