import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BookingState, BookingDay, BoardTypeCode } from "../../types";

const initialState: BookingState = {
  citizenship: undefined,
  startDate: undefined,
  daysCount: 1,
  destination: undefined,
  boardType: "NB",
  daily: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<Partial<BookingState>>) {
      Object.assign(state, action.payload);
      // initialize daily array when startDate or daysCount changes
      if (state.startDate && state.daysCount) {
        const start = new Date(state.startDate);
        state.daily = Array.from({ length: state.daysCount }).map((_, i) => {
          const d = new Date(start);
          d.setDate(start.getDate() + i);
          return { date: d.toISOString().slice(0, 10) } as BookingDay;
        });
      }
    },
    setDayHotel(
      state,
      action: PayloadAction<{ dayIndex: number; hotelId?: number }>
    ) {
      const { dayIndex, hotelId } = action.payload;
      if (!state.daily[dayIndex]) return;
      state.daily[dayIndex].hotelId = hotelId;
    },
    setDayMeal(
      state,
      action: PayloadAction<{
        dayIndex: number;
        mealType: "lunch" | "dinner";
        mealId?: number | null;
      }>
    ) {
      const { dayIndex, mealType, mealId } = action.payload;
      if (!state.daily[dayIndex]) return;
      if (mealType === "lunch") state.daily[dayIndex].lunchId = mealId ?? null;
      if (mealType === "dinner")
        state.daily[dayIndex].dinnerId = mealId ?? null;
    },
    setBoardType(state, action: PayloadAction<BoardTypeCode>) {
      state.boardType = action.payload;
      // apply rules: if NB -> clear meals
      if (action.payload === "NB") {
        state.daily = state.daily.map((d) => ({
          ...d,
          lunchId: null,
          dinnerId: null,
        }));
      }
    },
    resetBooking() {
      return initialState;
    },
  },
});

export const {
  setConfig,
  setDayHotel,
  setDayMeal,
  setBoardType,
  resetBooking,
} = bookingSlice.actions;

export default bookingSlice.reducer;
