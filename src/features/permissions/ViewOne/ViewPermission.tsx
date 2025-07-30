
import PermissionInfo from "./PermissionInfo";
import CustomModal from "@/components/CustomModal";
import type { Permission } from "@/types/permission";
interface IModalProps {
  open: boolean;
  onClose: () => void;
  permission: Permission ;
}
const ViewEmployeeModal = ({ open, onClose, permission }: IModalProps) => {
  return (
    <CustomModal
      title={`View ${permission?.name}`}
      open={open}
      onClose={onClose}
    >
      <PermissionInfo permission={permission} />
    </CustomModal>
  );
};

export default ViewEmployeeModal;
