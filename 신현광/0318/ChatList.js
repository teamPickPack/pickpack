import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import ChatRoom from "./ChatRoom";

const ChatList = () => {
  const roomName = useRef();
  const [chatrooms, setChatrooms] = useState([]);
  const [roomInfo, setRoomInfo] = useState();

  const createRoom = useCallback(() => {
    if ("" === roomName.current.value) {
      alert("방 제목을 입력해 주십시요.");
      return;
    } else {
      let params = new URLSearchParams();
      params.append("name", roomName.current.value);
      axios
        .post("http://192.168.80.246:8080/chat/room", params)
        .then((response) => {
          alert(response.data.name + "방 개설에 성공하였습니다.");
          roomName.current.value = "";
        })
        .catch((response) => {
          alert("채팅방 개설에 실패하였습니다.");
        });
    }
  }, []);

  useEffect(() => {
    axios.get("http://192.168.80.246:8080/chat/rooms").then((response) => {
      setChatrooms(response.data);
    });
  }, [createRoom]);

  return (
    <div>
      <h2>채팅목록</h2>
      <div>
        <div>
          <div>
            <label>방제목</label>
          </div>
          <input type="text" ref={roomName} />
          <div>
            <button type="button" onClick={createRoom}>
              채팅방 개설
            </button>
          </div>
        </div>
        <ul>
          {chatrooms.map((room) => {
            return (
              <li
                onClick={() =>
                  setRoomInfo({ roomId: room.roomId, roomName: room.name })
                }
                key={room.roomId}
              >
                {room.name}
              </li>
            );
          })}
        </ul>
      </div>
      {roomInfo && (
        <ChatRoom roomId={roomInfo.roomId} roomName={roomInfo.roomName} />
      )}
    </div>
  );
};

export default ChatList;
