import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { chatAction } from "../../../store/chatSlice";
import borrow from "../../../assets/image/borrow.jpg";
import { useEffect } from "react";
import axios from "axios";
import { useRef } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { item } from "../../../apis/item";
import store from "../../../store/store";
import noImg from "../../../assets/image/noimg.png";
import { chat } from "../../../apis/chat";

const ChatRoom = (props) => {
  const [isFold, setIsFold] = useState(false);
  const [textCheck, setTextCheck] = useState(false);
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [roomId, setRoomId] = useState(props.roomId);
  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState();
  const dispatch = useDispatch();
  const [itemInfo, setItemInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const myNickName = useSelector((state) => {
    return state.user.nickname;
  });

  const roomInfo = useSelector((state) => {
    return state.chat.roomInfo;
  });

  useEffect(() => {
    setIsLoading(true);
    const getItemInfo = async () => {
      setTimeout(async () => {
        const response = await item.post.detail(
          roomInfo.itemId,
          store.getState().user.memberId
        );
        setItemInfo(response.item);
        const msgData = {
          roomId: roomId,
          // date: new Date().toISOString().substring(0, 10),
          date: "2023-04-05",
        };

        const result = await chat.post.message(msgData);

        console.log(result);
        if (result) {
          setMessages([...result.chatMessages]);
        }

        setIsLoading(false);
      }, 500);
    };

    getItemInfo();
  }, []);

  const message = useRef();

  const stompClient = useRef();

  const reconnectTimeout = 5000;

  useEffect(() => {
    const connect = async () => {
      try {
        const socket = new SockJS("https://j8b307.p.ssafy.io/chat/ws-stomp");
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect(
          {},
          (frame) => {
            console.log(stompClient.current);
            try {
              stompClient.current.subscribe(
                `/chat/sub/room/${roomId}`,
                function (message) {
                  console.log(message);
                  let recv = JSON.parse(message.body);
                  recvMessage(recv);
                }
              );
            } catch (err) {
              console.log(err);
            }
            console.log(frame);
          },
          (error) => {
            console.log(`STOMP error: ${error}`);
            setTimeout(connect, reconnectTimeout);
          }
        );
      } catch (error) {
        console.log(error);
      }
    };

    connect();

    return async () => {
      if (stompClient !== null) {
        stompClient.current.disconnect();
        console.log("연결이 끊어졌습니다.");
      }
    };
  }, [roomId]);

  const sendMessage = (type) => {
    if (stompClient == null) {
      return;
    }
    try {
      stompClient.current.send(
        `/chat/pub/message`,
        {},
        JSON.stringify({
          type: type,
          roomId: roomId,
          sender: myNickName,
          message: message.current.value,
          time: new Date(),
        })
      );
    } catch (err) {
      console.log(err);
    }
    message.current.value = "";
  };

  const recvMessage = (recv) => {
    const msg = {
      type: recv.type,
      roomId: recv.roomId,
      sender: recv.sender,
      message: recv.message,
      time: recv.time,
    };

    console.log(msg);

    setMessages((messages) => [...messages, msg]);
    const body = document.getElementById("room-body");
    setTimeout(() => {
      body.scrollTop = body.scrollHeight;
    }, []);
  };

  useEffect(() => {
    let imagePreview = [];

    if (images.length === 0) {
      setPreview([]);
      return;
    }

    const setPreviewImages = async () => {
      images.forEach(async (image) => {
        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onload = () => {
          imagePreview = [
            ...imagePreview,
            { image: image, url: reader.result },
          ];
          setPreview(imagePreview);
        };
      });
    };

    setPreviewImages();
  }, [images]);

  console.log(images, preview);

  const returnChatList = () => {
    dispatch(chatAction.setRoomInfo(null));
  };

  const ImageChangeEventHandler = async (data) => {
    const input = [...data.target.files];
    data.target.value = "";

    const removeDupl = [...images, ...input];

    const nonDuplImages = removeDupl.filter((item) => {
      let idx;

      for (let i = 0; i < removeDupl.length; i++) {
        if (item.name === removeDupl[i].name) {
          idx = i;
        }
      }

      return idx === removeDupl.indexOf(item);
    });

    if (nonDuplImages.length > 5) {
      alert(`이미지 전송은 최대 5개까지만 가능합니다.`);
      return;
    }

    let imageTypeValid = false;
    let imageSizeValid = false;

    nonDuplImages.forEach((image) => {
      if (!image.type.includes("image")) {
        imageTypeValid = true;
      }

      if (image.size > 5 * 1024 * 1024) {
        imageSizeValid = true;
      }
    });

    if (imageTypeValid) {
      alert(
        "등록하실 사진을 확인해주세요!\n이미지 형식의 파일만 등록이 가능합니다."
      );
      return;
    }

    if (imageSizeValid) {
      alert(
        `등록이 가능한 사진의 최대 크기는 1장당 10MB입니다.\n업로드 파일의 크기를 확인바랍니다.`
      );
      return;
    }

    setImages([...nonDuplImages]);
  };

  console.log(roomInfo);

  const timeAgo = (datetimeString) => {
    console.log(datetimeString);
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
    <RoomContainer>
      <RoomHeader>
        <ReturnSVG clickHandler={returnChatList} />
        <div>
          {roomInfo.seller === myNickName ? roomInfo.buyer : roomInfo.seller}
        </div>
        {isFold ? (
          <UnfoldSVG
            clickHandler={() => {
              setIsFold(!isFold);
            }}
          />
        ) : (
          <FoldSVG
            clickHandler={() => {
              setIsFold(!isFold);
            }}
          />
        )}
      </RoomHeader>
      {!isFold &&
        (isLoading ? (
          <LayerPopup>
            <div className="spinner"></div>
          </LayerPopup>
        ) : (
          <RoomInfo>
            <div className="left-info">
              <p>{roomInfo.seller}</p>
              <p>
                작성일ㆍ{timeAgo(itemInfo.registDate)}{" "}
                <span>{itemInfo.cityName}</span>
              </p>
              <p className="item-title">{itemInfo.title}</p>
            </div>
            <div className="right-info">
              <img
                src={itemInfo.imgUrl.substring(0, itemInfo.imgUrl.length - 1)}
                onError={(e) => {
                  e.target.src = noImg;
                }}
                alt={itemInfo.itemName}
              />
              <div className="right-btn">거래하기</div>
            </div>
          </RoomInfo>
        ))}
      {/* <ImagePreview></ImagePreview>
       */}
      <div>
        <RoomBody id="room-body" isImage={preview.length}>
          {messages.map((message, idx) => {
            if (message.sender === myNickName) {
              return (
                <BuyerMessage key={idx}>
                  <div className="m-box">
                    <div className="time-box">
                      {timeAgo(
                        message.time.substring(0, 10) +
                          " " +
                          message.time.substring(11, 19)
                      )}
                    </div>
                    <pre className="message-box">{message.message}</pre>
                  </div>
                </BuyerMessage>
              );
            } else {
              return (
                <SellerMessage key={idx}>
                  <div className="m-box">
                    <pre className="message-box">{message.message}</pre>
                    <div className="time-box">
                      {timeAgo(
                        message.time.substring(0, 10) +
                          " " +
                          message.time.substring(11, 19)
                      )}
                    </div>
                  </div>
                </SellerMessage>
              );
            }
          })}
          {!messages.length && (
            <div className="greeting">인사를 통해 채팅을 시작해보세요!</div>
          )}
        </RoomBody>
        {preview.length !== 0 && (
          <div className="image-preview">
            {preview.map((image, idx) => {
              return (
                <img
                  src={image.url}
                  alt={idx}
                  onClick={() => {
                    console.log(image);
                    setImages(
                      images.filter((item) => {
                        return item !== image.image;
                      })
                    );
                  }}
                />
              );
            })}
          </div>
        )}
        <RoomFooter textCheck={textCheck}>
          <div>
            <input
              type="file"
              id="Image"
              accept="image/*"
              multiple
              onChange={ImageChangeEventHandler}
              style={{ display: "none" }}
            />
            <label htmlFor="Image">
              <InputImageSVG />
            </label>
          </div>
          <div>
            <textarea
              onChange={(e) => {
                if (e.target.value) {
                  setTextCheck(true);
                } else {
                  setTextCheck(false);
                }
              }}
              onKeyDown={(e) => {
                console.log(e);
                if (e.key === "Enter" && e.shiftKey) {
                  return;
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage("TALK");
                }
              }}
              ref={message}
            />
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                sendMessage("TALK");
              }}
            >
              전송
            </button>
          </div>
        </RoomFooter>
      </div>
    </RoomContainer>
  );
};

const InputImageSVG = (props) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer" }}
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="7"
        fill="white"
        strokeWidth="2"
      />
      <path
        d="M9.99844 13.6004C10.7105 13.6004 11.4065 13.3893 11.9985 12.9937C12.5905 12.5981 13.0519 12.0359 13.3244 11.3781C13.5969 10.7202 13.6682 9.9964 13.5293 9.29807C13.3904 8.59974 13.0475 7.95828 12.544 7.45481C12.0406 6.95134 11.3991 6.60847 10.7008 6.46957C10.0024 6.33066 9.27859 6.40195 8.62078 6.67443C7.96296 6.9469 7.40072 7.40832 7.00515 8.00034C6.60957 8.59236 6.39844 9.28838 6.39844 10.0004C6.39844 10.9552 6.77772 11.8708 7.45285 12.546C8.12798 13.2211 9.04366 13.6004 9.99844 13.6004ZM9.99844 8.80039C10.2358 8.80039 10.4678 8.87077 10.6651 9.00263C10.8625 9.13449 11.0163 9.3219 11.1071 9.54117C11.1979 9.76044 11.2217 10.0017 11.1754 10.2345C11.1291 10.4673 11.0148 10.6811 10.847 10.8489C10.6791 11.0167 10.4653 11.131 10.2325 11.1773C9.99977 11.2236 9.75849 11.1999 9.53922 11.109C9.31995 11.0182 9.13253 10.8644 9.00067 10.6671C8.86882 10.4697 8.79844 10.2377 8.79844 10.0004C8.79844 9.68213 8.92487 9.37691 9.14991 9.15186C9.37495 8.92682 9.68018 8.80039 9.99844 8.80039Z"
        fill="#EC5B5B"
      />
      <path
        d="M21.6479 13.9528C21.5338 13.8338 21.3955 13.7408 21.2422 13.6802C21.089 13.6195 20.9245 13.5926 20.7599 13.6012C20.5956 13.607 20.4342 13.6462 20.2857 13.7166C20.1371 13.787 20.0045 13.8869 19.8959 14.0104L16.2599 18.1612L13.2479 15.148C13.0229 14.923 12.7177 14.7966 12.3995 14.7966C12.0813 14.7966 11.7761 14.923 11.5511 15.148L6.75111 19.948C6.6365 20.0587 6.54508 20.1911 6.48219 20.3375C6.4193 20.4839 6.3862 20.6414 6.38481 20.8007C6.38343 20.96 6.41379 21.118 6.47413 21.2655C6.53446 21.413 6.62357 21.547 6.73624 21.6597C6.84891 21.7723 6.98289 21.8614 7.13037 21.9218C7.27784 21.9821 7.43586 22.0125 7.59519 22.0111C7.75453 22.0097 7.91199 21.9766 8.0584 21.9137C8.2048 21.8508 8.33722 21.7594 8.44791 21.6448L12.3995 17.698L14.6795 19.978L11.4959 23.6104C11.2862 23.85 11.1802 24.1632 11.2014 24.4809C11.2225 24.7987 11.3691 25.095 11.6087 25.3048C11.8484 25.5145 12.1615 25.6205 12.4793 25.5993C12.797 25.5781 13.0934 25.4316 13.3031 25.192L17.1647 20.7784H17.1719L17.1803 20.7652L20.8583 16.5652L23.5511 19.258C23.7774 19.4766 24.0806 19.5975 24.3952 19.5948C24.7098 19.5921 25.0108 19.4659 25.2333 19.2434C25.4558 19.0209 25.582 18.7199 25.5847 18.4053C25.5875 18.0906 25.4665 17.7875 25.2479 17.5612L21.6479 13.9528Z"
        fill="#1CC500"
      />
    </svg>
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

const SellerMessage = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 4px 12px;

  .m-box {
    display: flex;

    .time-box {
      display: flex;
      font-size: 11px;
      flex-direction: column-reverse;
      margin-bottom: 2px;
      margin-left: 4px;
      color: #666666;
    }

    .message-box {
      max-width: 260px;
      padding: 4px 8px;
      font-size: 16px;
      text-align: start;
      margin: 0;
      background: #fce2db;
      border-radius: 6px;
      white-space: pre-wrap;
    }
  }
`;

const BuyerMessage = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 4px 12px;

  .m-box {
    display: flex;

    .time-box {
      display: flex;
      font-size: 11px;
      flex-direction: column-reverse;
      margin-bottom: 2px;
      margin-right: 4px;
      color: #666666;
    }

    .message-box {
      max-width: 260px;
      padding: 4px 8px;
      font-size: 16px;
      text-align: start;
      margin: 0;
      background: #fce2db;
      border-radius: 6px;
      white-space: pre-wrap;
    }
  }
`;

const RoomContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .image-preview {
    background: #ffffff;
    display: flex;
    padding: 4px 12px;
    border-top: 1px solid #d9d9d9;

    img {
      width: 80px;
      height: 80px;
      margin: 0 14px;
    }
  }
`;

const RoomFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: #432c7a;
  border-radius: 0 0 6px 6px;

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    textarea {
      outline: none;
      border: none;
      resize: none;
      font-weight: 600;
      font-size: 14px;
      color: #000000;
      width: 448px;
      height: ${(props) => {
        return props.textCheck ? 80 : 24;
      }}px;
      border-radius: 8px;
      line-height: 22px;
      overflow-y: scroll; /* 세로 스크롤바는 항상 표시 */
      scrollbar-width: none; /* 스크롤바 너비 제거 */
      -ms-overflow-style: none; /* IE/Edge 용 스크롤바 제거 */
    }

    textarea::-webkit-scrollbar {
      display: none; /* Chrome/Safari 용 스크롤바 제거 */
    }

    textarea:focus {
      height: 80px;
      border-color: #333;
      box-shadow: 0 0 10px #333;
    }

    button {
      display: flex;

      padding: 4px 12px;
      font-size: 14px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }
  }
`;

const RoomBody = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll; /* 세로 스크롤바는 항상 표시 */
  scrollbar-width: none; /* 스크롤바 너비 제거 */
  -ms-overflow-style: none; /* IE/Edge 용 스크롤바 제거 */
  max-height: ${(props) => {
    return props.isImage === 0 ? 484 : 379;
  }}px;

  ::-webkit-scrollbar {
    display: none; /* Chrome/Safari 용 스크롤바 제거 */
  }

  .greeting {
    height: 280px;
  }
`;

const RoomInfo = styled.div`
  height: 80px;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d9d9d9;
  border-width: 0 0 1px 0;
  position: absolute;
  background: #ffffff;
  width: 512px;
  top: 56px;

  .left-info {
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: flex-start;
    font-size: 16px;
    font-weight: 600;

    .item-title {
      display: block;
      max-width: 340px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    p {
      margin: 0;
      display: flex;
      align-items: center;

      span {
        background: #ff8fb1;
        padding: 2px 8px;
        border-radius: 8px;
        font-size: 12px;
        color: #ffffff;
        margin-left: 4px;
      }
    }
  }

  .right-info {
    display: flex;
    align-items: center;
    img {
      width: 80px;
      height: 80px;
      border-radius: 4px;
      border: 1px solid #d9d9d9;
    }
    .right-btn {
      background: #ff8fb1;
      border-radius: 8px;
      padding: 4px 8px;
      transform: translate(8px, 0);
      color: #ffffff;
      cursor: pointer;
    }
  }
`;

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

const LayerPopup = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  justify-content: center;
  align-items: center;

  .spinner {
    position: absolute;
    top: 45%;
    left: 43%;
    border: 8px solid #f3f3f3; /* Light grey */
    border-top: 8px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spinner 2s linear infinite;
  }
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default ChatRoom;
