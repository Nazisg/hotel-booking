import { Header } from "./components/Header";
import { BookingStepper } from "./components/BookingStepper";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-4">
        <BookingStepper />
      </main>
    </div>
  );
}
