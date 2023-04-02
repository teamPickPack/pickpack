import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { chatAction } from "../../../store/chatSlice";

const ChatRoom = () => {
  const [isFold, setIsFold] = useState(true);

  const dispatch = useDispatch();

  const openChatRoom = () => {
    dispatch(chatAction.setRoomId(null));
  };

  return (
    <>
      <RoomHeader>
        <ReturnSVG clickHandler={openChatRoom} />
        <div>닉네임</div>
        {isFold ? (
          <UnfoldSVG
            clickHandler={() => {
              console.log(12);
              setIsFold(!isFold);
            }}
          />
        ) : (
          <FoldSVG
            clickHandler={() => {
              console.log(23);
              setIsFold(!isFold);
            }}
          />
        )}
      </RoomHeader>
    </>
  );
};

const ReturnSVG = (props) => {
  return (
    <svg
      onClick={props.clickHandler}
      width="22"
      height="22"
      viewBox="0 0 28 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24.0508 9.70039C22.0258 7.75039 19.2508 6.62539 16.4008 6.62539C13.4008 6.62539 10.4008 6.62539 7.32578 6.62539C7.10078 6.62539 6.80078 6.62539 6.57578 6.62539C7.55078 5.65039 8.45078 4.75039 9.42578 3.77539C10.1008 3.10039 10.1008 1.97539 9.42578 1.37539C8.75078 0.700391 7.62578 0.700391 7.02578 1.37539C5.15078 3.25039 3.27578 5.12539 1.40078 7.00039C0.725781 7.67539 0.725781 8.80039 1.40078 9.40039C3.35078 11.3504 5.22578 13.2254 7.25078 15.2504C7.92578 15.9254 9.05078 15.9254 9.65078 15.2504C10.3258 14.5754 10.3258 13.4504 9.65078 12.8504C8.67578 11.8754 7.77578 10.9754 6.80078 10.0004C9.65078 10.0004 12.3508 10.0004 15.2008 10.0004C15.6508 10.0004 16.0258 10.0004 16.4758 10.0004C21.0508 10.0754 24.7258 14.2754 23.7508 18.8504C23.3008 21.1004 21.9508 22.9004 20.0008 24.0254C18.3508 24.8504 16.6258 24.8504 14.8258 24.8504C12.5758 24.8504 12.5758 28.3004 14.8258 28.3004C16.6258 28.3004 18.3508 28.3004 20.0758 27.7004C22.4008 26.8754 24.4258 25.2254 25.7008 23.1254C28.3258 18.8504 27.6508 13.1504 24.0508 9.70039Z"
        fill="white"
      />
    </svg>
  );
};

const UnfoldSVG = (props) => {
  return (
    <svg
      onClick={props.clickHandler}
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.391688 0.411974C-0.130561 0.959396 -0.130561 1.84197 0.391688 2.3894L9.2486 11.6732C9.66427 12.1089 10.3357 12.1089 10.7514 11.6732L19.6083 2.3894C20.1306 1.84197 20.1306 0.959396 19.6083 0.411974C19.0861 -0.135448 18.2441 -0.135448 17.7218 0.411974L9.99467 8.50041L2.26752 0.400802C1.75593 -0.135448 0.903278 -0.135448 0.391688 0.411974Z"
        fill="#ffffff"
      />
    </svg>
  );
};

const FoldSVG = (props) => {
  return (
    <svg
      onClick={props.clickHandler}
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.391685 11.588C-0.130564 11.0406 -0.130564 10.158 0.391685 9.6106L9.2486 0.326777C9.66427 -0.108926 10.3357 -0.108926 10.7514 0.326777L19.6083 9.6106C20.1306 10.158 20.1306 11.0406 19.6083 11.588C19.0861 12.1354 18.2441 12.1354 17.7218 11.588L9.99467 3.49959L2.26752 11.5992C1.75593 12.1354 0.903276 12.1354 0.391685 11.588Z"
        fill="#ffffff"
      />
    </svg>
  );
};

const RoomHeader = styled.div`
  background: #432c7a;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  height: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 6px 6px 0 0;

  svg {
    cursor: pointer;
  }
`;

export default ChatRoom;
