import type { IUser } from "@/types/user";
import { getCookie } from "@/utils/cookiesHandler";
import { create } from "zustand";
interface IUserStore {
  user: IUser | null;
  login: (user: IUser) => void;
  logout: () => void;
  getUser: () => IUser | null;
}

export const useUserStore = create<IUserStore>((set, get) => ({
  user: getCookie<IUser>("user") || null,
  login: (user: IUser) => set({ user }),
  logout: () => set({ user: null }),
  getUser: () => get().user,
}));
