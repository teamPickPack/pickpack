import { useDispatch } from "react-redux";
import styled from "styled-components";
import borrow from "../../../assets/image/borrow.jpg";
import { chatAction } from "../../../store/chatSlice";

const ChatItem = () => {
  const dispatch = useDispatch();

  const openChatRoom = () => {
    dispatch(chatAction.setRoomId(1));
  };

  return (
    <ChatItemContainer onClick={openChatRoom}>
      <div className="left-div">
        <input type="checkbox" value="아이디.." />
        <div>
          <p>닉네임</p>
          <p>마지막 채팅 내용</p>
        </div>
      </div>
      <div className="right-div">
        <img src={borrow} />
      </div>
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

    p {
      margin: 0;
      display: flex;
      font-weight: 600;
      font-size: 16px;
    }
  }

  .right-div {
    display: flex;

    img {
      width: 56px;
      height: 56px;
      border-radius: 4px;
    }
  }
`;

export default ChatItem;
