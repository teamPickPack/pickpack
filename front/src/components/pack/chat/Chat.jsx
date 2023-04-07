import { useSelector } from "react-redux";
import styled from "styled-components";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";

const Chat = (props) => {
  const roomId = useSelector((state) => {
    return state.chat.roomId;
  });

  return (
    <ChatContainer>
      <ChatInner>
        {roomId ? (
          <ChatRoom roomId={roomId} />
        ) : (
          <ChatList setChatOpen={props.setChatOpen} chatOpen={props.chatOpen} />
        )}
      </ChatInner>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ChatInner = styled.div`
  position: fixed;
  margin: 0 320px;
  z-index: 1001;
  background: #ffffff;
  height: 640px;
  width: 560px;
  border-radius: 8px;
  margin-top: 2vh;
`;

export default Chat;
