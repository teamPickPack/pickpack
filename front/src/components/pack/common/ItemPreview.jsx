import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ItemPreview = (props) => {
  const item = props.item;
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

  return (
    <LiWrapper
      onClick={() => {
        navigator(`/pack/detail/${item.itemId}`);
      }}
    >
      <img src={item.imgUrl} alt={item.itemName} />
      <div className="item-desc">
        <div>
          <span className="item-title">{item.title}</span>
          <span className="regist-date">{timeAgo(item.registDate)}</span>
        </div>
        <div>
          <span className="city-name">{item.cityName}</span>
          <span className="item-price">
            {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </span>
        </div>
      </div>
    </LiWrapper>
  );
};

const LiWrapper = styled.li`
  display: flex;
  width: 240px;
  height: 308px;
  border: 1px solid black;
  background: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  flex-direction: column;
  margin-top: 38px;
  cursor: pointer;
  transition: all 0.2s ease;

  :hover {
    border: 1px solid #626262;
    box-shadow: 0 0 8px 8px #d9d9d9;
  }

  img {
    width: 240px;
    height: 236px;
    border-radius: 7px 7px 0px 0px;
  }

  .item-desc {
    width: 224px;
    height: 56px;
    font-weight: 600;
    font-size: 16px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .regist-date {
      font-size: 12px;
      color: #000000;
    }

    .item-title {
      display: block;
      text-align: start;
      margin: 0;
      width: 176px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .city-name {
      font-size: 12px;
      color: #ffffff;
      background: #ff8fb1;
      border-radius: 8px;
      padding: 4px 8px;
    }

    .item-price {
      font-weight: 600;
      font-size: 16px;
      color: #000000;
    }
  }
`;

export default ItemPreview;
