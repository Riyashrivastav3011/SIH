import { create } from "zustand";
import { moreTrains } from "../mock/data";

export const useTrainStore = create((set, get) => ({
  trains: moreTrains,
  selected: null,
  search: "",

  setSearch: (search) => set({ search }),

  select: (num) =>
    set({
      selected:
        get().trains.find((train) => train.number === num) || null,
    }),
}));