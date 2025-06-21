/** @format */

"use client";

import type React from "react";

import { useState } from "react";
import { Info, FileText, AlertCircle, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddPageConnector from "./AddPageConnector";
import FormDesignerStatusBar from "./FormDesignerStatusBar";
import PageNodeActionMenu from "./PageNodeActionMenu";
import PageNode from "./PageNode";

interface Step {
  id: string;
  title: string;
  icon: React.ReactNode;
}

const initialSteps: Step[] = [
  {
    id: "1",
    title: "Info",
    icon: <Info className="w-4 h-4 " />,
  },
  {
    id: "2",
    title: "Details",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "3",
    title: "Other",
    icon: <AlertCircle className="w-4 h-4" />,
  },
  {
    id: "4",
    title: "Ending",
    icon: <Check className="w-4 h-4" />,
  },
];

export default function FormDesigner() {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [hoveredConnection, setHoveredConnection] = useState<number | null>(
    null
  );
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [focusedStep, setFocusedStep] = useState<string | null>(null);

  const handleAddPageBetween = (connectionIndex: number) => {
    const newStep: Step = {
      id: Date.now().toString(),
      title: `Step ${connectionIndex + 2}`,
      icon: <FileText className="w-4 h-4" />,
    };
    const newSteps = [...steps];
    newSteps.splice(connectionIndex + 1, 0, newStep);
    setSteps(newSteps);
  };

  const handleAddPage = () => {
    const newStep: Step = {
      id: Date.now().toString(),
      title: `Step ${steps.length + 1}`,
      icon: <FileText className="w-4 h-4" />,
    };
    setSteps([...steps, newStep]);
  };

  const handleStepClick = (stepId: string) => {
    setSelectedStep(stepId);
    console.log(`Step selected: ${stepId}`);
  };

  const handleStepFocus = (stepId: string) => {
    setFocusedStep(stepId);
  };

  const handleStepBlur = () => {
    setFocusedStep(null);
  };

  // Funciones para el menú de configuraciones
  const handleSetAsFirstPage = (stepId: string) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    if (stepIndex > 0) {
      const newSteps = [...steps];
      const [step] = newSteps.splice(stepIndex, 1);
      newSteps.unshift(step);
      setSteps(newSteps);
    }
    setSelectedStep(null);
    console.log(`Set as first page: ${stepId}`);
  };

  const handleRename = (stepId: string) => {
    const newTitle = prompt("Enter new name:");
    if (newTitle) {
      setSteps(
        steps.map((step) =>
          step.id === stepId ? { ...step, title: newTitle } : step
        )
      );
    }
    setSelectedStep(null);
  };

  const handleCopy = (stepId: string) => {
    const step = steps.find((s) => s.id === stepId);
    if (step) {
      console.log(`Copied step: ${step.title}`);
      // Aquí podrías implementar lógica de clipboard
    }
    setSelectedStep(null);
  };

  const handleDuplicate = (stepId: string) => {
    const stepIndex = steps.findIndex((step) => step.id === stepId);
    const step = steps[stepIndex];
    if (step) {
      const duplicatedStep: Step = {
        ...step,
        id: Date.now().toString(),
        title: `${step.title} Copy`,
      };
      const newSteps = [...steps];
      newSteps.splice(stepIndex + 1, 0, duplicatedStep);
      setSteps(newSteps);
    }
    setSelectedStep(null);
  };

  const handleDelete = (stepId: string) => {
    if (steps.length > 1) {
      setSteps(steps.filter((step) => step.id !== stepId));
    }
    setSelectedStep(null);
  };

  const handleDragStart = (e: React.DragEvent, stepId: string) => {
    setDraggedItem(stepId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", stepId);
  };

  const handleDragOver = (e: React.DragEvent, stepId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverItem(stepId);
  };

  const handleDragLeave = () => {
    setDragOverItem(null);
  };

  const handleDrop = (e: React.DragEvent, targetStepId: string) => {
    e.preventDefault();

    if (!draggedItem || draggedItem === targetStepId) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const draggedIndex = steps.findIndex((step) => step.id === draggedItem);
    const targetIndex = steps.findIndex((step) => step.id === targetStepId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newSteps = [...steps];
    const [removed] = newSteps.splice(draggedIndex, 1);
    newSteps.splice(targetIndex, 0, removed);

    setSteps(newSteps);
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, stepId: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleStepClick(stepId);
    }
  };

  return (
    <div className="h-[100dvh] bg-gray-100 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="px-4 flex flex-col md:gap-2 md:flex-row md:flex-wrap items-center overflow-auto py-2  border-[1px] border-[#E1E1E1] rounded-md">
          {steps.map((step, index) => {
            const isSelected = selectedStep === step.id;
            const isFocused = focusedStep === step.id;
            const isLastStep = index === steps.length - 1;

            return (
              <div
                key={step.id}
                className="flex flex-col md:flex-row items-center"
              >
                <div className="flex flex-col items-center relative">
                  <PageNode
                    index={index}
                    step={step}
                    isSelected={isSelected}
                    isFocused={isFocused}
                    draggedItem={draggedItem}
                    dragOverItem={dragOverItem}
                    handleStepClick={handleStepClick}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDragLeave={handleDragLeave}
                    handleDrop={handleDrop}
                    handleDragEnd={handleDragEnd}
                    handleStepFocus={handleStepFocus}
                    handleStepBlur={handleStepBlur}
                    handleKeyDown={handleKeyDown}
                    handleAddPageBetween={handleAddPageBetween}
                    handleAddPage={handleAddPage}
                  />

                  {isSelected && (
                    <PageNodeActionMenu
                      step={step}
                      steps={steps}
                      handleCopy={handleCopy}
                      handleDelete={handleDelete}
                      handleDuplicate={handleDuplicate}
                      handleRename={handleRename}
                      handleSetAsFirstPage={handleSetAsFirstPage}
                    />
                  )}
                </div>

                {!isLastStep && (
                  <div
                    className="relative mx-4"
                    onMouseEnter={() => setHoveredConnection(index)}
                    onMouseLeave={() => setHoveredConnection(null)}
                  >
                    <div className="connector md:h-[1.5px] md:w-[20px]" />

                    <AddPageConnector
                      index={index}
                      hoveredConnection={hoveredConnection}
                      handleAddPageBetween={handleAddPageBetween}
                    />
                  </div>
                )}
              </div>
            );
          })}

          <div className="connector md:h-[1.5px] md:w-[20px]" />

          <Button
            onClick={handleAddPage}
            variant="outline"
            className="baseButton"
          >
            <Plus className="w-9 h-9 mr-1" />
            Add page
          </Button>
        </div>

        <div className="mt-12 text-center space-y-2">
          <p className="text-sm text-gray-500">
            Click on any step to see settings • Hover over dotted lines to add
            pages
          </p>
          <p className="text-sm text-blue-600 font-medium">
            💡 Drag and drop steps to reorder • Use Tab to navigate
          </p>
          <p className="text-sm text-green-600 font-medium">
            ⌨️ Press Enter or Space when focused to select a step
          </p>
        </div>
      </div>

      <FormDesignerStatusBar steps={steps} selectedStep={selectedStep} />
    </div>
  );
}
