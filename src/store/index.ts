import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./slices/bookingSlice";

// localStorage-dan initialState alma funksiyası
function loadState() {
  try {
    const serializedState = localStorage.getItem("bookingState");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn("localStorage-dan state oxuma xətası:", err);
    return undefined;
  }
}

// store yarat
export const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
  preloadedState: {
    booking: loadState(),
  },
});

// state dəyişəndə localStorage-a yaz
store.subscribe(() => {
  try {
    const state = store.getState().booking;
    const serializedState = JSON.stringify(state);
    localStorage.setItem("bookingState", serializedState);
  } catch (err) {
    console.warn("localStorage-a state yazma xətası:", err);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
