import styled from "styled-components";
import ChatItem from "./ChatItem";

const ChatList = (props) => {
  return (
    <>
      <ListHeader>
        <span>채팅목록</span>
        <div className="right-div">
          <TrashCanSVG />
          <CloseSVG
            clickEvent={() => {
              console.log(123);
              props.setChatOpen(!props.chatOpen);
            }}
          />
        </div>
      </ListHeader>
      <ListBody>
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </ListBody>
    </>
  );
};

const CloseSVG = (props) => {
  return (
    <svg
      onClick={props.clickEvent}
      className="close-svg"
      width="22"
      height="22"
      viewBox="0 0 22 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 1L1 13"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 1L13 13"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const TrashCanSVG = () => {
  return (
    <svg
      width="20"
      height="24"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 12.5858L12.2929 10.2929L13.7071 11.7071L11.4142 14L13.7071 16.2929L12.2929 17.7071L10 15.4142L7.70711 17.7071L6.29289 16.2929L8.58579 14L6.29289 11.7071L7.70711 10.2929L10 12.5858ZM5 3V2C5 0.89543 5.89543 0 7 0H13C14.1046 0 15 0.89543 15 2V3H18C19.1046 3 20 3.89543 20 5V7C20 8.10457 19.1046 9 18 9H17.9199L17 20C17 21.1046 16.1046 22 15 22H5C3.89543 22 3 21.1046 3.00345 20.083L2.07987 9H2C0.89543 9 0 8.10457 0 7V5C0 3.89543 0.89543 3 2 3H5ZM5 5H2V7H18V5H15H5ZM4.08649 9L5 20H15L15.0035 19.917L15.9132 9H4.08649ZM13 3V2H7V3H13Z"
        fill="#ffffff"
      />
    </svg>
  );
};

const ListBody = styled.div``;

const ListHeader = styled.div`
  background: #432c7a;
  font-weight: 600;
  font-size: 20px;
  color: #ffffff;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px 6px 0 0;

  .right-div {
    position: absolute;
    right: 2px;
    height: 22px;

    svg {
      cursor: pointer;
      margin: 0 12px;

      :hover {
        path {
          fill: red;
        }
      }
    }

    .close-svg {
      :hover {
        path {
          stroke: #000000;
        }
      }
    }
  }
`;

export default ChatList;

//채팅하기 누르면 채팅방으로 바로
