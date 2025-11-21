import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { resetBooking } from "../../store/slices/bookingSlice";
import { hotels, meals } from "../../data/data";

export const Summary: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { citizenship, startDate, daysCount, destination, boardType, daily } =
    useSelector((state: RootState) => state.booking);

  if (!destination) return <p className="text-red-500">Destination not selected</p>;

  const destinationHotels = hotels[destination];
  const destinationMeals = meals[destination];

  // Calculate daily totals
  const dailyTotals = daily.map(day => {
    const hotel = destinationHotels.find(h => h.id === day.hotelId);
    const lunch = day.lunchId
      ? destinationMeals.lunch.find(m => m.id === day.lunchId)
      : null;
    const dinner = day.dinnerId
      ? destinationMeals.dinner.find(m => m.id === day.dinnerId)
      : null;

    const total = (hotel?.price ?? 0) + (lunch?.price ?? 0) + (dinner?.price ?? 0);
    return { date: day.date, total, hotel, lunch, dinner };
  });

  const grandTotal = dailyTotals.reduce((sum, d) => sum + d.total, 0);

  const handleReset = () => {
    dispatch(resetBooking());
    localStorage.removeItem("bookingState");
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mt-6">
      <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

      {/* Configuration */}
      <div className="mb-4 space-y-1">
        <p><strong>Citizenship:</strong> {citizenship || "-"}</p>
        <p><strong>Destination:</strong> {destination}</p>
        <p><strong>Start Date:</strong> {startDate || "-"}</p>
        <p><strong>Number of Days:</strong> {daysCount}</p>
        <p><strong>Board Type:</strong> {boardType}</p>
      </div>

      {/* Daily selections */}
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Day</th>
            <th className="border p-2">Hotel</th>
            <th className="border p-2">Lunch</th>
            <th className="border p-2">Dinner</th>
            <th className="border p-2">Daily Total</th>
          </tr>
        </thead>
        <tbody>
          {dailyTotals.map(d => (
            <tr key={d.date} className="text-center">
              <td className="border p-2">{d.date}</td>
              <td className="border p-2">{d.hotel?.name || "-"}</td>
              <td className="border p-2">{d.lunch?.name || "-"}</td>
              <td className="border p-2">{d.dinner?.name || "-"}</td>
              <td className="border p-2">${d.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-right font-bold text-lg">Grand Total: ${grandTotal}</p>

      {/* Reset button */}
      <button
        onClick={handleReset}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Reset
      </button>
    </div>
  );
};
