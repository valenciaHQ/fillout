/** @format */

import { Plus } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  classNames?: string;
  index: number;
  handleAddPageBetween: (index: number) => void;
  hoveredConnection: number | null;
};

export default function AddPageConnector({
  hoveredConnection,
  index,
  handleAddPageBetween,
}: Props) {
  return (
    <div
      className={`
                            absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
                            transition-all duration-200 z-10
                            ${
                              hoveredConnection === index
                                ? "scale-100 opacity-100"
                                : "scale-0 opacity-0"
                            }
                          `}
    >
      <Button
        size="sm"
        onClick={() => handleAddPageBetween(index)}
        className="w-4 h-4 rounded-full bg-white hover:bg-white text-black shadow-lg p-0 border-0"
        title="Add page"
      >
        <Plus className="w-1 h-1" />
      </Button>
    </div>
  );
}
//${
