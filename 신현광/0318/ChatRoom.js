import { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import axios from "axios";
import { Stomp } from "@stomp/stompjs";

const ChatRoom = (props) => {
  //   console.log(props.roomId);
  const [roomId, setRoomId] = useState(props.roomId);
  const [roomName, setRoomName] = useState(props.roomName);

  const [messages, setMessages] = useState([]);
  const [token, setToken] = useState();

  const message = useRef();

  const stompClient = useRef();

  const reconnectTimeout = 5000;

  console.log(roomId);

  useEffect(() => {
    const connect = async () => {
      try {
        const response = await axios.get(
          "http://192.168.80.246:8080/chat/user"
        );
        const token = response.data.token;
        setToken(token);

        const socket = new SockJS("http://192.168.80.246:8080/ws-stomp");
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect(
          { token: token },
          (frame) => {
            // 연결 성공 시 필요한 작업 수행
            console.log("hi");
            try {
              stompClient.current.subscribe(
                `/sub/chat/room/${roomId}`,
                function (message) {
                  let recv = JSON.parse(message.body);
                  recvMessage(recv);
                }
              );
              sendMessage("ENTER");
              console.log("succ");
            } catch (err) {
              console.log(err);
            }
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

    // return () => {
    //   if (stompClient !== null) {
    //     stompClient.current.disconnect();
    //   }
    // };
  }, []);

  const sendMessage = (type) => {
    // if (stompClient == null) {
    //   return;
    // }
    console.log(stompClient);
    try {
      stompClient.current.send(
        `/pub/chat/message`,
        { token: token },
        JSON.stringify({
          type: type,
          roomId: roomId,
          message: message.current.value,
        })
      );
    } catch (err) {
      console.log(err);
    }
    message.current.value = "";
  };

  const recvMessage = (recv) => {
    // if (stompClient == null) {
    //   return;
    // }
    console.log(recv);
    const recvMsg = {
      type: recv.type,
      sender: recv.sender,
      message: recv.message,
    };
    setMessages([...messages, recvMsg]);
    console.log(messages);
  };
  return (
    <div>
      <div>
        <div>
          <div>
            <h3>{roomName}</h3>
          </div>
        </div>
        <div>
          <div>
            <label>내용</label>
          </div>
          <input type="text" ref={message} />
          <div>
            <button
              type="button"
              onClick={() => {
                sendMessage("TALK");
              }}
            >
              보내기
            </button>
          </div>
        </div>
        <ul>
          {messages.map((item) => {
            return (
              <li key={item.type}>
                {item.sender} - {item.message}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ChatRoom;
