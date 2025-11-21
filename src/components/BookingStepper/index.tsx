import { useState } from "react";
import { DailyTable } from "../DailyTable";
import { InitialConfigForm } from "../InitialConfigForm";
import { Summary } from "../Summary";

export const BookingStepper: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="space-y-6">
      {/* Step indicators */}
      <div className="flex justify-between mb-4">
        {["Configuration", "Daily Selections", "Summary"].map(
          (label, index) => (
            <div
              key={index}
              className={`flex-1 text-center py-2 border-b-2 ${
                currentStep === index + 1
                  ? "border-blue-600 font-bold"
                  : "border-gray-300"
              }`}
            >
              {label}
            </div>
          )
        )}
      </div>

      {/* Step content */}
      <div>
        {currentStep === 1 && <InitialConfigForm nextStep={nextStep} />}
        {currentStep === 2 && (
          <DailyTable nextStep={nextStep} prevStep={prevStep} />
        )}
        {currentStep === 3 && <Summary prevStep={prevStep} />}
      </div>
    </div>
  );
};
