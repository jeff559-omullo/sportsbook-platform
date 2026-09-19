import { create } from "zustand";

export type Market = "HOME" | "DRAW" | "AWAY";

export interface BetSelection {
  id: number;
  home: string;
  away: string;
  market: Market;
  odd: number;
}

interface BetSlipStore {
  selections: BetSelection[];
  toggleSelection: (selection: BetSelection) => void;
  clearSelections: () => void;
}

export const useBetSlipStore = create<BetSlipStore>((set) => ({
  selections: [],

  toggleSelection: (selection) =>
    set((state) => {
      const exists = state.selections.find(
        (item) =>
          item.id === selection.id &&
          item.market === selection.market,
      );

      if (exists) {
        return {
          selections: state.selections.filter(
            (item) =>
              !(
                item.id === selection.id &&
                item.market === selection.market
              ),
          ),
        };
      }

      return {
        selections: [
          ...state.selections.filter(
            (item) => item.id !== selection.id,
          ),
          selection,
        ],
      };
    }),

  clearSelections: () => ({
    selections: [],
  }),
}));