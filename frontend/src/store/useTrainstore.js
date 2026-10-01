import { create } from "zustand";
import { getTrainOverview } from "../services/trainApi";

export const useTrainStore = create((set, get) => ({
  trains: [],
  loading: true,
  error: "",
  selected: null,
  search: "",

  setSearch: (search) => set({ search }),

  fetchTrains: async () => {
    try {
      const trains = await getTrainOverview();
      set({ trains, loading: false, error: "" });
    } catch (e) {
      set({ loading: false, error: "Unable to reach the server. Is the backend running?" });
    }
  },

  select: (num) =>
    set({ selected: get().trains.find((t) => t.number === num) || null }),
}));
