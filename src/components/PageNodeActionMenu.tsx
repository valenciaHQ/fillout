/** @format */

import { Copy, Edit3, Files, Flag, MoreVertical, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  step: { id: string; title: string };
  steps: { id: string; title: string }[];
  handleSetAsFirstPage: (id: string) => void;
  handleRename: (id: string) => void;
  handleCopy: (id: string) => void;
  handleDuplicate: (id: string) => void;
  handleDelete: (id: string) => void;
};

export default function PageNodeActionMenu({
  step,
  steps,
  handleSetAsFirstPage,
  handleRename,
  handleCopy,
  handleDuplicate,
  handleDelete,
}: Props) {
  return (
    <div className="absolute -top-2 -right-2 z-20">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className="w-6 h-6 rounded-full bg-white border border-gray-300 hover:bg-gray-50 shadow-sm p-0"
          >
            <MoreVertical className="w-3 h-3 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-48">
          <h6 className="px-2 py-1.5 text-xs font-medium text-gray-500 border-b">
            Settings
          </h6>
          <DropdownMenuItem
            onClick={() => handleSetAsFirstPage(step.id)}
            className="cursor-pointer"
          >
            <Flag className="w-4 h-4 mr-2 text-blue-500" />
            Set as first page
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleRename(step.id)}
            className="cursor-pointer"
          >
            <Edit3 className="w-4 h-4 mr-2 text-gray-500" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleCopy(step.id)}
            className="cursor-pointer"
          >
            <Copy className="w-4 h-4 mr-2 text-gray-500" />
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDuplicate(step.id)}
            className="cursor-pointer"
          >
            <Files className="w-4 h-4 mr-2 text-gray-500" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleDelete(step.id)}
            className="cursor-pointer text-red-600 focus:text-red-600"
            disabled={steps.length <= 1}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
