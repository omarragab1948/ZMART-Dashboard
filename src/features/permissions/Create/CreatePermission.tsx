import type { Permission } from "@/types/permission";
import CreatePermissionForm from "./CreatePermissionForm";
import CustomModal from "@/components/CustomModal";

interface IModalProps {
  open: boolean;
  onClose: () => void;
  permission: Permission | null;
}

const CreateEditPermissionModal = ({
  open,
  onClose,
  permission,
}: IModalProps) => {
  return (
    <CustomModal
      onClose={onClose}
      open={open}
      title={permission ? `Edit ${permission?.name}` : "Create Permission"}
    >
      <CreatePermissionForm permission={permission} onClose={onClose} />
    </CustomModal>
  );
};

export default CreateEditPermissionModal;
