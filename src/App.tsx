import React from "react";
import { Header } from "./components/Header";
import { InitialConfigForm } from "./components/InitialConfigForm";
import { DailyTable } from "./components/DailyTable";
import { Summary } from "./components/Summary";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4 space-y-6">
        <InitialConfigForm />
        <DailyTable />
        <Summary />
      </main>
    </div>
  );
}
