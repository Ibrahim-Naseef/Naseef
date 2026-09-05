import { create } from "zustand";

interface HackerModeState {
  hackerMode: boolean;
  toggleHackerMode: () => void;
  setHackerMode: (value: boolean) => void;
}

function applyHackerModeClass(active: boolean) {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("hacker-mode", active);
}

export const useHackerModeStore = create<HackerModeState>((set, get) => ({
  hackerMode: false,
  toggleHackerMode: () => {
    const next = !get().hackerMode;
    set({ hackerMode: next });
    applyHackerModeClass(next);
  },
  setHackerMode: (value: boolean) => {
    set({ hackerMode: value });
    applyHackerModeClass(value);
  },
}));