import { Button } from "@/components/ui/button";
import type { FC } from "react";
import CustomModal from "./CustomModal";

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
  return (
    <CustomModal onClose={onClose} open={open} title={title}>
      <div className="p-2 w-full">
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
    </CustomModal>
  );
};

export default ConfirmDelete;
