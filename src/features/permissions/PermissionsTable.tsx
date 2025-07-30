import ConfirmDelete from "@/components/ConfirmDelete";
import CustomTable from "@/components/CustomTable";
import { useBoolean } from "@/hooks/useBoolean";
import { useDeleteData } from "@/services/actions";
import { endpoints } from "@/services/endpoints";
import type { Permission } from "@/types/permission";
import type { TableAction } from "@/types/table";
import isArray from "@/utils/isArray";
import { useState } from "react";
import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import { convertDate } from "@/utils/convertDate";

interface IPermissionTableProps {
  data: Permission[];
  total: number;
  openEditModal: (permission: Permission) => void;
  openViewModal: (permission: Permission) => void;
  openModal: boolean;
}

const tableHead = [
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "createdAt", label: "Created At" },
];

const PermissionsTable = ({
  data,
  total,
  openEditModal,
  openViewModal,
}: IPermissionTableProps) => {
  const { setFalse, setTrue, value } = useBoolean();
  const [permission, setPermission] = useState<Permission | null>(null);
  const { mutate: deleteMutate } = useDeleteData({
    mutationKey: ["permission"],
    invalidate: ["permission"],
    showToastOnError: true,
    toastSuccessMessage: "Permission deleted successfully",
  });

  const handleDeleteItem = (permission: Permission | null) => {
    deleteMutate({
      method: "delete",
      url: `/${endpoints.permissions.list}/${permission?.id}`,
    });
    setFalse();
  };
  const actions: TableAction<Permission>[] = [
    {
      title: "Delete",
      icon: <FaTrash color="red" />,
      onClick: (item: Permission) => {
        setPermission(item);
        setTrue();
      },
    },
    {
      title: "Edit",
      icon: <FaPen color="blue" />,
      onClick: (item: Permission) => {
        openEditModal(item);
      },
    },
    {
      title: "View",
      icon: <FaEye color="black" />,
      onClick: (item: Permission) => {
        openViewModal(item);
      },
    },
  ];
  return (
    <>
      <CustomTable<Permission>
        items={isArray<Permission[]>(data)}
        customRender={{
          createdAt: (item) => convertDate(item?.createdAt),
          description: (item) =>
            item.description.slice(0, 20) || "No description",
        }}
        tableHead={tableHead}
        actions={actions}
        total={total}
      />
      <ConfirmDelete
        open={value}
        onConfirm={() => handleDeleteItem(permission)}
        onClose={setFalse}
      />
    </>
  );
};

export default PermissionsTable;
