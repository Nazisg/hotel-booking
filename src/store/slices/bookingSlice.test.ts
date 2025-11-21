// import bookingReducer, { setConfig, resetBooking } from "./bookingSlice";

// describe("bookingSlice", () => {
//   it("should set config", () => {
//     const initialState = { daysCount: 1, daily: [], boardType: "NB" } as any;
//     const nextState = bookingReducer(
//       initialState,
//       setConfig({ daysCount: 3, boardType: "FB" })
//     );
//     expect(nextState.daysCount).toBe(3);
//     expect(nextState.boardType).toBe("FB");
//     expect(nextState.daily.length).toBe(3);
//   });

//   it("should reset booking", () => {
//     const state = { daysCount: 5, daily: [{ date: "2025-01-01" }] } as any;
//     const nextState = bookingReducer(state, resetBooking());
//     expect(nextState.daily.length).toBe(0);
//   });
// });
