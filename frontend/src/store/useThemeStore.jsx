import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("streamify - theme") || "coffee",
  
  //default ga coffee untadhi..but user change chesthe change avthundhi , if refresh chesthe malla coffee ee chupisthundhi...ela avvakudadhu kabatti local storage lo save chesthunam ee data..so refresh chesina aa theme ee untadhi

  setTheme: (theme) => {
    localStorage.setItem("streamify - theme", theme);
    set({ theme });
  }
}));

// Usage in a React component:
// const { theme, setTheme } = useThemeStore();
// setTheme("dark");