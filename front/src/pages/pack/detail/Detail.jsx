import styled from "styled-components";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import ItemPreview from "../../../components/pack/common/ItemPreview";
import { useEffect, useState } from "react";
import { item } from "../../../apis/item";
import { useSelector } from "react-redux";
import Spinner from "../../../components/pack/common/Spinner";
import noImg from "../../../assets/image/noimg.png";
import { chat } from "../../../apis/chat";
import store from "../../../store/store";

const Detail = () => {
  const navigator = useNavigate();
  const param = useParams();
  const [itemDetail, setItemDetail] = useState(null);
  const [isLike, setIsLike] = useState(false);
  const [images, setImages] = useState([]);
  const [imageNum, setImageNum] = useState(0);

  const memberId = useSelector((state) => {
    return state.user.memberId / 2373.15763 - 7;
  });

  useEffect(() => {
    const getItemInfo = async () => {
      const res = await item.post.detail(param.itemNo, memberId);

      console.log(res);

      window.scrollTo(0, 0);
      setItemDetail(res);
      setIsLike(res.isLike);
    };

    getItemInfo();
  }, [param]);

  useEffect(() => {
    if (!itemDetail) {
      return;
    }

    console.log(itemDetail.item.imgUrl);

    let imgs = itemDetail.item.imgUrl.split("|").filter((img) => {
      return img !== "";
    });

    setImages(imgs);
  }, [itemDetail]);

  const timeAgo = (datetimeString) => {
    const utcNow =
      new Date(datetimeString).getTime() +
      new Date(datetimeString).getTimezoneOffset() * 60 * 1000;
    const koreaTimeDiff = 27 * 60 * 60 * 1000;
    const koreaNow = new Date(utcNow + koreaTimeDiff);

    const now = koreaNow.toISOString();

    const datetime = new Date(
      now.substring(0, 10) + " " + now.substring(11, 19).replace(/-/g, "/")
    );
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

  const likeHandler = () => {
    if (memberId === -7) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    if (isLike) {
      const updateLike = async () => {
        await item.put.like(itemDetail.item.itemId, memberId);
        setIsLike(!isLike);
      };

      updateLike();
    } else {
      const updateLike = async () => {
        await item.post.like(itemDetail.item.itemId, memberId);
        setIsLike(!isLike);
      };

      updateLike();
    }
  };

  const openChatting = () => {
    if (memberId === -7) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    const data = {
      itemId: itemDetail.item.itemId,
      seller: itemDetail.item.nickname,
      buyer: store.getState().user.nickname,
    };

    chat.post.chat(data);
  };

  // 화살표로 사진보여주기 할차례입니다~~

  return (
    <>
      {!itemDetail ? (
        <Spinner />
      ) : (
        <DetailContainer>
          <DetailInner otherItemLength={itemDetail.otherItems.length}>
            <div className="inner-top">
              <div className="image-box">
                <img
                  src={images[imageNum]}
                  onError={(e) => {
                    e.target.src = noImg;
                  }}
                  alt={itemDetail.item.itemName}
                />
                <button
                  className="left-arrow"
                  onClick={() => {
                    if (imageNum === 0) {
                      setImageNum(images.length - 1);
                    } else {
                      setImageNum((imageNum) => {
                        return imageNum - 1;
                      });
                    }
                  }}
                >
                  <FaChevronLeft />
                </button>
                <button
                  className="right-arrow"
                  onClick={() => {
                    if (imageNum === images.length - 1) {
                      setImageNum(0);
                    } else {
                      setImageNum((imageNum) => {
                        return imageNum + 1;
                      });
                    }
                  }}
                >
                  <FaChevronRight />
                </button>
              </div>
              <div className="control-box">
                <div className="left-div">{itemDetail.item.nickname}</div>
                <div className="right-div">
                  {memberId !== itemDetail.item.memberId ? (
                    <>
                      <button type="button" onClick={openChatting}>
                        채팅하기
                      </button>
                      <input
                        id="like"
                        value={itemDetail.isLike}
                        type="checkbox"
                        onChange={() => {
                          console.log("hi");
                        }}
                        checked={isLike}
                      />
                      <label htmlFor="like" onClick={likeHandler}>
                        찜하기
                        <LikeSVG />
                      </label>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        navigator(`/pack/modify/${itemDetail.item.itemId}`);
                      }}
                    >
                      수정하기
                    </button>
                  )}
                </div>
              </div>
              <div className="info-box">
                <div className="left-div">
                  <h2>{itemDetail.item.title}</h2>
                  <div>
                    작성일ㆍ{timeAgo(itemDetail.item.registDate)}{" "}
                    <span className="tag-span">{itemDetail.item.cityName}</span>
                  </div>
                </div>
                <div className="right-div">
                  <div className="category-div">
                    {categoryName(itemDetail.item.category)}
                  </div>
                  <div className="price-div">
                    {setPriceFormat(itemDetail.item.price)}원
                  </div>
                </div>
              </div>
              <div className="content-box">
                <pre>{itemDetail.item.content}</pre>
              </div>
            </div>
            <div className="inner-bottom">
              <p>{itemDetail.item.nickname} 님의 다른 게시글</p>
              <div className="another-list">
                {itemDetail.otherItems.map((item) => {
                  return (
                    <ItemPreview
                      item={item}
                      key={item.itemId}
                      onClick={() => {
                        navigator(`/pack/detail/${item.itemId}`);
                      }}
                    />
                  );
                })}
              </div>
              {itemDetail.otherItems.length ? (
                <>
                  <button
                    className="left-arrow"
                    onClick={() => {
                      document.querySelector(".another-list").scrollBy(-266, 0);
                    }}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="right-arrow"
                    onClick={() => {
                      document.querySelector(".another-list").scrollBy(266, 0);
                    }}
                  >
                    <FaChevronRight />
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </DetailInner>
        </DetailContainer>
      )}
    </>
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
      transition: all 0.3s ease;
      scroll-behavior: smooth;

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
          margin: 0 0 2px 0;
        }

        .tag-span {
          display: inline-flex;
          padding: 4px 8px;
          background: #ff8fb1;
          color: #ffffff;
          border-radius: 8px;
          border: none;
          margin-left: 8px;
          font-size: 12px;
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
        min-height: 320px;
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

    .another-list {
      display: flex;
      max-width: 600px;
      overflow: hidden;
      align-items: center;
      justify-content: ${(props) => {
        return props.otherItemLength > 2 ? `flex-start` : `center`;
      }};
      scroll-behavior: smooth;

      li {
        margin: 24px 12px;
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
      transform: translate(-40px, -208px);
      svg {
        transform: translate(-2px, 0);
        width: 20px;
        height: 20px;
      }
    }

    .right-arrow {
      transform: translate(620px, -208px);
      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

export default Detail;
