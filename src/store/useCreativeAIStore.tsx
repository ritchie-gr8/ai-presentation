import { OutlineCard } from "@/lib/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CreativeAIStore = {
  outlines: OutlineCard[] | [];
  addMultipleOutlines: (outlines: OutlineCard[]) => void;
  addOutline: (outline: OutlineCard) => void;
  resetOutlines: () => void;
  currentAiPrompt: string;
  setCurrentAiPrompt: (prompt: string) => void;
};

const useCreativeAIStore = create<CreativeAIStore>()(
  persist(
    (set) => ({
      outlines: [],
      addMultipleOutlines: (outlines: OutlineCard[]) => {
        set((state) => ({
          outlines: [...outlines],
        }));
      },
      addOutline: (outline: OutlineCard) => {
        set((state) => ({
          outlines: [outline, ...state.outlines],
        }));
      },
      currentAiPrompt: "",
      setCurrentAiPrompt: (prompt: string) => {
        set({ currentAiPrompt: prompt });
      },
      resetOutlines: () => {
        set({ outlines: [] });
      },
    }),
    {
      name: "creative-ai",
    }
  )
);

export default useCreativeAIStore;
