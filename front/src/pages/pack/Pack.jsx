import { useEffect } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Chat from "../../components/pack/chat/Chat";
import ChatButton from "../../components/pack/chat/ChatButton";
import PackNav from "../../components/pack/common/PackNav";

const Pack = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      {createPortal(
        <ChatButton setChatOpen={setChatOpen} chatOpen={chatOpen} />,
        document.getElementById("chat-btn")
      )}
      {chatOpen &&
        createPortal(
          <BackGround
            onClick={() => {
              setChatOpen(!chatOpen);
            }}
          />,
          document.getElementById("background")
        )}
      {chatOpen && <Chat setChatOpen={setChatOpen} chatOpen={chatOpen} />}
      <PackNav />
      <PackContainer>
        <div className="pack-inner">
          <Outlet />
        </div>
      </PackContainer>
    </>
  );
};

const ChatContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

const BackGround = styled.div`
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #000000;
  opacity: 0.4;
  position: fixed;
  z-index: 1000;
`;

const PackContainer = styled.div`
  display: flex;
  justify-content: center;

  .pack-inner {
    width: 1200px;
  }
`;

export default Pack;
