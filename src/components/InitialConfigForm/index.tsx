import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setConfig, setBoardType } from "../../store/slices/bookingSlice";
import type { AppDispatch } from "../../store";

const countries = [
  { id: 1, name: "Turkey" },
  { id: 2, name: "UAE" },
  { id: 3, name: "Italy" },
];

export const InitialConfigForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [citizenship, setCitizenship] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [daysCount, setDaysCount] = useState<number>(1);
  const [destination, setDestination] = useState<string>("");
  const [boardType, setBoard] = useState<"FB" | "HB" | "NB">("NB");

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
    // Next: navigate to daily configuration (or reveal DailyTable)
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <div>
        <label className="block text-sm font-medium">Vətəndaşlıq</label>
        <select
          required
          value={citizenship}
          onChange={(e) => setCitizenship(e.target.value)}
          className="mt-1 block w-full border rounded p-2"
        >
          <option value="">Seçin</option>
          {countries.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Başlama Tarixi</label>
          <input required value={startDate} onChange={e=>setStartDate(e.target.value)} type="date" className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Gün sayı</label>
          <input required min={1} value={daysCount} onChange={e=>setDaysCount(Number(e.target.value))} type="number" className="mt-1 block w-full border rounded p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Təyinat Ölkəsi</label>
          <select required value={destination} onChange={e=>setDestination(e.target.value)} className="mt-1 block w-full border rounded p-2">
            <option value="">Seçin</option>
            {countries.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium">Qidalanma Paketi</label>
        <div className="mt-2 flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="board" checked={boardType==="FB"} onChange={()=>setBoard("FB")} />
            Full Board (FB)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="board" checked={boardType==="HB"} onChange={()=>setBoard("HB")} />
            Half Board (HB)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="board" checked={boardType==="NB"} onChange={()=>setBoard("NB")} />
            No Board (NB)
          </label>
        </div>
      </div>

      <div className="text-right">
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
          Davam et
        </button>
      </div>
    </form>
  );
};
