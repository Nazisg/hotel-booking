import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import type { Meal, Hotel } from "../../types";
import { setDayHotel, setDayMeal } from "../../store/slices/bookingSlice";
import { hotels, meals } from "../../data/data";

export const DailyTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { daily, destination, boardType } = useSelector((state: RootState) => state.booking);

  if (!destination) return null;

  const destinationHotels: Hotel[] = hotels[destination];
  const destinationMeals = meals[destination];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className="border p-2">Day</th>
            <th className="border p-2">Hotel</th>
            <th className="border p-2">Lunch</th>
            <th className="border p-2">Dinner</th>
          </tr>
        </thead>
        <tbody>
          {daily.map((day, index) => {
            const lunchDisabled = boardType === "NB" || (boardType === "HB" && day.dinnerId != null);
            const dinnerDisabled = boardType === "NB" || (boardType === "HB" && day.lunchId != null);

            return (
              <tr key={day.date} className="text-center">
                <td className="border p-2">{day.date}</td>

                {/* Hotel select */}
                <td className="border p-2">
                  <select
                    value={day.hotelId || ""}
                    onChange={e =>
                      dispatch(setDayHotel({ dayIndex: index, hotelId: Number(e.target.value) }))
                    }
                    className="border rounded px-2 py-1 w-full"
                  >
                    <option value="">Select Hotel</option>
                    {destinationHotels.map(h => (
                      <option key={h.id} value={h.id}>
                        {h.name} (${h.price})
                      </option>
                    ))}
                  </select>
                </td>

                {/* Lunch select */}
                <td className="border p-2">
                  <select
                    value={day.lunchId || ""}
                    disabled={lunchDisabled}
                    onChange={e =>
                      dispatch(
                        setDayMeal({
                          dayIndex: index,
                          mealType: "lunch",
                          mealId: e.target.value ? Number(e.target.value) : null,
                        })
                      )
                    }
                    className={`border rounded px-2 py-1 w-full ${
                      lunchDisabled ? "bg-gray-200 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="">Select Lunch</option>
                    {destinationMeals.lunch.map(l => (
                      <option key={l.id} value={l.id}>
                        {l.name} (${l.price})
                      </option>
                    ))}
                  </select>
                </td>

                {/* Dinner select */}
                <td className="border p-2">
                  <select
                    value={day.dinnerId || ""}
                    disabled={dinnerDisabled}
                    onChange={e =>
                      dispatch(
                        setDayMeal({
                          dayIndex: index,
                          mealType: "dinner",
                          mealId: e.target.value ? Number(e.target.value) : null,
                        })
                      )
                    }
                    className={`border rounded px-2 py-1 w-full ${
                      dinnerDisabled ? "bg-gray-200 cursor-not-allowed" : ""
                    }`}
                  >
                    <option value="">Select Dinner</option>
                    {destinationMeals.dinner.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name} (${d.price})
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
