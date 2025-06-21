/** @format */

type Props = {
  isSelected: boolean;
  isFocused: boolean;
  step: { id: string; title: string; icon: React.ReactNode };
  index: number;
  hoveredConnection?: number;
  draggedItem?: string | null;
  dragOverItem?: string | null;
  selectedStep?: string | null;
  focusedStep?: string | null;
  handleAddPage: (stepId: string) => void;
  handleStepClick: (stepId: string) => void;
  handleDragStart: (e: React.DragEvent, stepId: string) => void;
  handleDragOver: (e: React.DragEvent, stepId: string) => void;
  handleDragLeave: () => void;
  handleDrop: (e: React.DragEvent, stepId: string) => void;
  handleDragEnd: () => void;
  handleStepFocus: (stepId: string) => void;
  handleStepBlur: () => void;
  handleKeyDown: (e: React.KeyboardEvent, stepId: string) => void;
  handleAddPageBetween: (index: number) => void;
};

import clsx from "clsx";

export default function PageNode({
  isSelected,
  isFocused,
  step,
  index,
  draggedItem,
  dragOverItem,
  handleStepClick,
  handleDragStart,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleDragEnd,
  handleStepFocus,
  handleStepBlur,
  handleKeyDown,
}: Props) {
  return (
    <div
      draggable
      tabIndex={0}
      onDragStart={(e) => handleDragStart(e, step.id)}
      onDragOver={(e) => handleDragOver(e, step.id)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, step.id)}
      onDragEnd={handleDragEnd}
      onClick={() => handleStepClick(step.id)}
      onFocus={() => handleStepFocus(step.id)}
      onBlur={handleStepBlur}
      onKeyDown={(e) => handleKeyDown(e, step.id)}
      className={clsx(
        "node hover:bg-[#9DA4B259]",
        draggedItem === step.id && "opacity-50 scale-110",
        dragOverItem === step.id && "ring-2 ring-blue-400 ring-offset-2",
        isSelected && "isSelectedNode",
        isFocused && "isFocusedNode"
      )}
      aria-label={`Step ${index + 1}: ${step.title}`}
    >
      <span
        className={clsx(
          "nodeIcon",
          isSelected && "isSelectedNodeIcon",
          isFocused && "isFocusedNodeIcon"
        )}
      >
        {step.icon}
      </span>
      <span className="text-[#677289] text-sm">{step.title}</span>
    </div>
  );
}

/*
<div
                      draggable
                      tabIndex={0}
                      onDragStart={(e) => handleDragStart(e, step.id)}
                      onDragOver={(e) => handleDragOver(e, step.id)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, step.id)}
                      onDragEnd={handleDragEnd}
                      onClick={() => handleStepClick(step.id)}
                      onFocus={() => handleStepFocus(step.id)}
                      onBlur={handleStepBlur}
                      onKeyDown={(e) => handleKeyDown(e, step.id)}
                      className={`h-9 rounded-lg border-[0.5px] flex items-center justify-center bg-[#9DA4B226] p-2.5 gap-2 cursor-pointer hover:bg-[#9DA4B259] ${
                        draggedItem === step.id ? "opacity-50 scale-110" : ""
                      }
                        ${
                          dragOverItem === step.id
                            ? "ring-2 ring-blue-400 ring-offset-2"
                            : ""
                        }
                        ${isSelected ? "bg-white text-black" : ""}
                        ${isFocused ? "bg-white text-black" : ""}
                      `}
                      aria-label={`Step ${index + 1}: ${step.title}`}
                    >
                      <span
                        className={`text-[#677289] text-sm 
                        ${isSelected ? "text-[#F59D0E]" : ""}
                        ${isFocused ? "text-[#F59D0E]" : ""}`}
                      >
                        {step.icon}
                      </span>
                      <span className="text-[#677289] text-sm">
                        {step.title}
                      </span>
                    </div>
                    */
