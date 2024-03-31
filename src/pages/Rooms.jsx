import React, { useEffect } from "react";
import {
  createRoom,
  setCurrentRoomId,
} from "../store/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getRandomColor } from "../services";
import { clearUserInfo } from "../store/authSlice";

const Rooms = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const { rooms } = useSelector((state) => state.chat);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const otherUsers =
    users?.length && users.filter((i) => i?.id !== userInfo?.id);

  useEffect(() => {
    if (!userInfo?.id) {
      navigate("/");
    }
  }, [userInfo]);

  const handleChatStart = (otherUser) => {
    const existingRoom = rooms.find(
      (room) =>
        room.users.includes(userInfo.id) && room.users.includes(otherUser.id)
    );
    // console.log("existingRoom", existingRoom)

    if (existingRoom) {
      dispatch(setCurrentRoomId(existingRoom?.roomId));
      navigate("/chat");
      console.log(`Chat started with ${otherUser.name} in existing room`);
    } else {
      const roomId = uuidv4();
      dispatch(
        createRoom({ roomId, users: [userInfo.id, otherUser.id], messages: [] })
      );
      dispatch(setCurrentRoomId(roomId));
      navigate("/chat");
      console.log(
        `New room created between ${userInfo.name} and ${otherUser.name}`
      );
    }
  };

  const handleReset = () => {
    let filterRooms = rooms.filter(room => !room.users.includes(userInfo.id));
    let filterUsers = users.filter(user => user?.id !== userInfo?.id);
    localStorage.setItem('rooms', JSON.stringify(filterRooms))
    localStorage.setItem('users', JSON.stringify(filterUsers))
    dispatch(clearUserInfo())
    window.location.reload();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-500 to-purple-300 flex items-center justify-center">
      <div className="w-full h-screen p-2 overflow-y-auto">
        <div className="w-full flex justify-between items-center">
            <h2 className="text-xl font-bold text-white">Rooms</h2>
            <button className="bg-red-600 border py-1 px-3 rounded-lg text-white border-white font-medium" onClick={handleReset}>Reset</button>
        </div>
        <ul className="mt-2 flex flex-col gap-2">
          { otherUsers?.length ? otherUsers.map((user) => (
            <li
              className="w-full border-2 border-white p-2 rounded-lg flex items-center gap-2"
              key={user.id}
              onClick={() => handleChatStart(user)}
            >
              <div
                className="w-12 h-12 rounded-full"
                style={{ backgroundColor: getRandomColor() }}
              ></div>
              <div className="text-white">
                <p className="text-xl font-semibold">{user?.name}</p>
              </div>
            </li>
          )) : null}
        </ul>
      </div>
    </div>
  );
};

export default Rooms;
