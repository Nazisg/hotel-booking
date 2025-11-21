import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConfig, setBoardType } from "../../store/slices/bookingSlice";
import type { AppDispatch, RootState } from "../../store";
import type { BoardTypeCode, Country } from "../../types";
import { countries as countriesData } from "../../data/data";

interface Props {
  nextStep: () => void;
}

export const InitialConfigForm: React.FC<Props> = ({ nextStep }) => {
  const dispatch = useDispatch<AppDispatch>();
  const booking = useSelector((state: RootState) => state.booking);

  const [citizenship, setCitizenship] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [daysCount, setDaysCount] = useState<number>(1);
  const [destination, setDestination] = useState<string>("");
  const [boardType, setBoard] = useState<BoardTypeCode>("NB");

  useEffect(() => {
    setCitizenship(booking.citizenship || "");
    setStartDate(booking.startDate || "");
    setDaysCount(booking.daysCount || 1);
    setDestination(booking.destination || "");
    setBoard(booking.boardType || "NB");
  }, [booking]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      setConfig({
        citizenship,
        startDate,
        daysCount,
        destination,
      })
    );
    dispatch(setBoardType(boardType));
    nextStep();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 bg-white p-6 rounded shadow">
      {/* Citizenship */}
      <div>
        <label className="block text-sm font-medium">Citizenship</label>
        <select
          required
          value={citizenship}
          onChange={(e) => setCitizenship(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        >
          <option value="">Select</option>
          {countriesData.map((c: Country) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range and Destination */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Start Date</label>
          <input
            required
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Number of Days</label>
          <input
            required
            type="number"
            min={1}
            value={daysCount}
            onChange={(e) => setDaysCount(Number(e.target.value))}
            className="mt-1 block w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">
            Destination Country
          </label>
          <select
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="mt-1 block w-full border rounded p-2"
          >
            <option value="">Select</option>
            {countriesData.map((c: Country) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Board Type */}
      <div>
        <label className="block text-sm font-medium">Board Type</label>
        <div className="mt-2 flex gap-4">
          {["FB", "HB", "NB"].map((type) => (
            <label key={type} className="flex items-center gap-2">
              <input
                type="radio"
                name="board"
                checked={boardType === type}
                onChange={() => setBoard(type as BoardTypeCode)}
              />
              {type === "FB"
                ? "Full Board (FB)"
                : type === "HB"
                ? "Half Board (HB)"
                : "No Board (NB)"}
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <div className="text-right">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>
      </div>
    </form>
  );
};
