import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRoomId: null,
  rooms: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentRoomId: (state, { payload }) => {
      state.currentRoomId = payload;
    },
    createRoom: (state, { payload }) => {
      state.rooms = [...state.rooms, payload];
      localStorage.setItem("rooms", JSON.stringify(state.rooms));
    },
    sendMessage: (state, { payload }) => {
      const { roomId, userId, message } = payload;
      const index = state.rooms.findIndex((i) => i.roomId === roomId);

      if (index !== -1) {
        const selectedRoom = state.rooms[index];
        // console.log("selectedRoom", selectedRoom)
        state.rooms[index] = {
          ...selectedRoom,
          messages: [...selectedRoom?.messages, { userId, message }],
        };
        localStorage.setItem("rooms", JSON.stringify(state.rooms));
      }
    },
    updateRoomsFromLocalStorage: (state, { payload }) => {
      state.rooms = payload;
    },
  },
});

const savedRooms = JSON.parse(localStorage.getItem("rooms"));
if (savedRooms) {
  initialState.rooms = savedRooms;
}

export const {
  setCurrentRoomId,
  createRoom,
  sendMessage,
  updateRoomsFromLocalStorage,
} = chatSlice.actions;
export default chatSlice.reducer;
