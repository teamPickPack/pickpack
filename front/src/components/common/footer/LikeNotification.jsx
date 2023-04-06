import { useSelector } from "react-redux";
import styled from "styled-components";
import { CloseSVG } from "../../../pages/pick/main/elements/SVG";
import { useNavigate } from "react-router";
import store from "../../../store/store";
import { userAction } from "../../../store/userSlice";
import { useEffect } from "react";

const LikeNotification = () => {
  const { firebaseOnMessage, likeCount } = useSelector((state) => {
    const item = {
      firebaseOnMessage: state.user.firebaseOnMessage,
      likeCount: state.user.likeCount,
    };
    return item;
  });

  const navigator = useNavigate();

  const onCloseNotification = () => {
    store.dispatch(userAction.setFirebaseOnMessage(false));
  };

  useEffect(() => {
    if (firebaseOnMessage) {
      setTimeout(() => {
        document.getElementById("notification").style.bottom = "0px";
      }, 200);
    }
  }, [firebaseOnMessage]);

  return (
    <>
      {firebaseOnMessage && (
        <Notification id="notification">
          <div className="notification-header">
            <span>원하시는 항공권을 발견했어요!</span>
            <button
              onClick={() => {
                onCloseNotification();
              }}
            >
              <CloseSVG />
            </button>
          </div>
          <div className="notification-body">
            찜해두신 항공권 중 {+likeCount[0] + +likeCount[1]}건의
            <br /> 항공권이 기준가격에 도달했습니다!
          </div>
          <div className="direct-btn">
            <div
              onClick={() => {
                navigator("/mypage");
                onCloseNotification();
              }}
            >
              바로가기
            </div>
          </div>
        </Notification>
      )}
    </>
  );
};

const Notification = styled.div`
  right: 0;
  bottom: -250px;
  position: fixed;
  background: #3165dd;
  width: 360px;
  height: 240px;
  border: 1px solid #d9d9d9;
  border-width: 1px 1px 0 1px;
  border-radius: 8px 0 0 0;
  z-index: 10000;
  color: white;
  transition: all 600ms cubic-bezier(0.5, 0, 0.07, 1);

  .notification-header {
    margin-top: 36px;
    font-size: 22px;
    font-weight: 700;

    button {
      background: none;
      border: none;
      outline: none;
      right: 8px;
      top: 14px;
      position: absolute;
      cursor: pointer;

      svg {
        width: 12px;

        path {
          stroke: white;
        }
      }
    }
  }

  .notification-body {
    padding: 24px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
  }

  .direct-btn {
    display: flex;
    justify-content: center;
    align-items: center;

    > div {
      width: 100px;
      background: none;
      color: #ffffff;
      font-size: 18px;
      font-weight: 500;
      padding: 4px 12px;
      border: 1px solid #ffffff;
      z-index: 1;
      -webkit-transition: all 0.4s;
      -moz-transition: all 0.4s;
      -ms-transition: all 0.4s;
      -o-transition: all 0.4s;
      transition: all 0.4s;
      cursor: pointer;

      :after {
        content: "";
        width: 0;
        height: 36px;
        position: absolute;
        -webkit-transition: all 0.4s;
        -moz-transition: all 0.4s;
        -ms-transition: all 0.4s;
        -o-transition: all 0.4s;
        transition: all 0.4s;
        background: #ffffff;
        transform: translate(-95px, -5px);
      }
      :hover {
        color: #333;
      }
      :hover:after {
        width: 124px;
        z-index: -1;
      }
    }
  }
`;

export default LikeNotification;
