import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { resetBooking } from "../../store/slices/bookingSlice";
import { hotels, meals } from "../../data/data";
import jsPDF from "jspdf";
// @ts-ignore
import domtoimage from "dom-to-image-more";

interface SummaryProps {
  prevStep: () => void; // go back to Step 2
}

export const Summary: React.FC<SummaryProps> = ({ prevStep }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { citizenship, startDate, daysCount, destination, boardType, daily } =
    useSelector((state: RootState) => state.booking);

  const summaryRef = useRef<HTMLDivElement>(null);

  if (!destination)
    return <p className="text-red-500">Destination not selected</p>;

  const destinationHotels = hotels[destination];
  const destinationMeals = meals[destination];

  // Calculate daily totals
  const dailyTotals = daily.map((day) => {
    const hotel = destinationHotels.find((h) => h.id === day.hotelId);
    const lunch = day.lunchId
      ? destinationMeals.lunch.find((m) => m.id === day.lunchId)
      : null;
    const dinner = day.dinnerId
      ? destinationMeals.dinner.find((m) => m.id === day.dinnerId)
      : null;

    const total =
      (hotel?.price ?? 0) + (lunch?.price ?? 0) + (dinner?.price ?? 0);
    return { date: day.date, total, hotel, lunch, dinner };
  });

  const grandTotal = dailyTotals.reduce((sum, d) => sum + d.total, 0);

  const handleReset = () => {
    dispatch(resetBooking());
    localStorage.removeItem("bookingState");
  };

  const exportPDF = async () => {
    if (!summaryRef.current) return;

    const scale = 2;

    // Hide borders for PDF
    const pdfStyle = {
      transform: `scale(${scale})`,
      transformOrigin: "top left",
      width: `${summaryRef.current.offsetWidth}px`,
      height: `${summaryRef.current.offsetHeight}px`,
      border: "none", // remove outer border
    };

    const tableElements = summaryRef.current.querySelectorAll(
      "table, th, td"
    ) as NodeListOf<HTMLElement>;
    tableElements.forEach((el) => {
      el.style.border = "none"; // remove table borders
    });

    const dataUrl = await domtoimage.toPng(summaryRef.current, {
      style: pdfStyle,
      width: summaryRef.current.offsetWidth * scale,
      height: summaryRef.current.offsetHeight * scale,
    });

    // Restore borders after export
    tableElements.forEach((el) => (el.style.border = ""));

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("booking-summary.pdf");
  };

  const handlePrint = () => {
    if (!summaryRef.current) return;

    const printContents = summaryRef.current.innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mt-6" ref={summaryRef}>
      <h2 className="text-xl font-bold mb-4">Booking Summary</h2>

      {/* Configuration */}
      <div className="mb-4 space-y-1">
        <p>
          <strong>Citizenship:</strong> {citizenship || "-"}
        </p>
        <p>
          <strong>Destination:</strong> {destination}
        </p>
        <p>
          <strong>Start Date:</strong> {startDate || "-"}
        </p>
        <p>
          <strong>Number of Days:</strong> {daysCount}
        </p>
        <p>
          <strong>Board Type:</strong> {boardType}
        </p>
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
          {dailyTotals.map((d) => (
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

      {/* Buttons */}
      <div className="mt-4 flex gap-2 flex-wrap">
        <button
          onClick={prevStep}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reset
        </button>
        <button
          onClick={exportPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Export as PDF
        </button>
        <button
          onClick={handlePrint}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Print
        </button>
      </div>
    </div>
  );
};
