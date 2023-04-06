import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import borrow from "../../../assets/image/borrow.jpg";
import { chatAction } from "../../../store/chatSlice";
import { useEffect, useState } from "react";
import store from "../../../store/store";
import { chat } from "../../../apis/chat";
import noImg from "../../../assets/image/noimg.png";

const ChatItem = (props) => {
  const dispatch = useDispatch();
  const [chatItem, setChatItem] = useState(props.chatItem);

  const myNickName = useSelector((state) => {
    return state.user.nickname;
  });

  const openChatRoom = () => {
    const data = {
      itemId: chatItem.itemId,
      seller: chatItem.nickName,
      buyer: store.getState().user.nickname,
    };

    chat.post.chat(data);
  };

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

  const getImgUrl = (imgUrl) => {
    const imgs = imgUrl.split("|");
    return imgs[0];
  };

  return (
    <ChatItemContainer>
      <div className="left-div">
        <input type="checkbox" value={chatItem.roomId} />
        <div>
          <p>{chatItem.nickName}</p>
          <p>{chatItem.lastMessage}</p>
        </div>
      </div>
      <div className="right-div">
        <div className="right-info">
          <div className="">{timeAgo(chatItem.lastMessageTime)}</div>
          {chatItem.new ? (
            chatItem.lastWriter !== myNickName && (
              <div className="new-box">New</div>
            )
          ) : (
            <div className="empty-box"></div>
          )}
        </div>
        <img
          src={getImgUrl(chatItem.imgUrl)}
          alt={chatItem.imgUrl}
          onError={(e) => {
            e.target.src = noImg;
          }}
        />
      </div>
      <div className="open-chat-box" onClick={openChatRoom}></div>
    </ChatItemContainer>
  );
};

const ChatItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  height: 48px;
  cursor: pointer;

  :hover {
    background: rgba(252, 226, 219, 0.4);
  }

  .left-div {
    display: flex;

    input[type="checkbox"] {
      margin-right: 12px;
      width: 16px;
      cursor: pointer;
      outline: none;
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      p {
        margin: 0;
        display: block;
        font-weight: 600;
        max-width: 350px;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .right-div {
    display: flex;
    .right-info {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    }
    .new-box {
      border-radius: 16px;
      padding: 4px 8px;
      background: #ff5a5a;
      font-size: 12px;
      color: #ffffff;
      font-weight: 600;
      height: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .empty-box {
      height: 12px;
      padding: 4px 8px;
    }
    img {
      width: 56px;
      height: 56px;
      border-radius: 4px;
      margin-left: 8px;
      border: 1px solid #d9d9d9;
    }
  }

  .open-chat-box {
    position: absolute;
    background: none;
    width: 93%;
    right: 0;
    height: 72px;
  }
`;

export default ChatItem;
