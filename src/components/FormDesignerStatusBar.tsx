/** @format */

type Props = {
  steps: { id: string; title: string }[];
  selectedStep: string | null;
};

export default function FormDesignerStatusBar({ steps, selectedStep }: Props) {
  {
    return (
      <div className="flex-shrink-0 bg-white border-t border-gray-200 p-4">
        <h4 className="font-medium mb-3 text-gray-900">Current Steps:</h4>
        <div className="flex flex-wrap gap-2">
          {steps.map((step, index) => (
            <span
              key={step.id}
              className={`
                  text-xs px-3 py-1 rounded-full border text-black
                  ${selectedStep === step.id ? "ring-2 ring-blue-400" : ""}
                `}
            >
              {index + 1}. {step.title}
              {selectedStep === step.id && "• Selected"}
            </span>
          ))}
        </div>
      </div>
    );
  }
}
