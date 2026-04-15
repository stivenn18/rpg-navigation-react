import { create } from "zustand";
import { getRoom } from "../data/worldMap";

export const useGameStore = create((set, get) => ({
  playerName: "",
  currentLocationId: "entrada",

  setPlayerName: (name) => set({ playerName: name }),

  move: (direction) => {
    const currentRoom = getRoom(get().currentLocationId);
    if (!currentRoom) return;

    const nextRoomId = currentRoom.direcciones[direction];
    if (nextRoomId) {
      set({ currentLocationId: nextRoomId });
    }
  },

  reset: () => set({ playerName: "", currentLocationId: "entrada" }),
}));
