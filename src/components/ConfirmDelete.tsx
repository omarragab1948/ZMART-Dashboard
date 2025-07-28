import { Button } from "@/components/ui/button";
import type { FC } from "react";

interface ConfirmDeleteProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  onConfirm: () => void;
}

const ConfirmDelete: FC<ConfirmDeleteProps> = ({
  open,
  onClose,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{message}</p>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-gray-300 cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            className="cursor-pointer"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
