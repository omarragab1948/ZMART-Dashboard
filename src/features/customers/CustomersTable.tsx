import ConfirmDelete from "@/components/ConfirmDelete";
import CustomTable from "@/components/CustomTable";
import { useBoolean } from "@/hooks/useBoolean";
import { useDeleteData, useEditData } from "@/services/actions";
import { endpoints } from "@/services/endpoints";
import type { Customer } from "@/types/customer";
import type { TableAction, TableCustomRender } from "@/types/table";
import isArray from "@/utils/isArray";
import { renderStatus } from "@/utils/renderStatus";
import { useState } from "react";
import { FaBan, FaCheck, FaEye, FaTrash, FaUndo } from "react-icons/fa";
import { useNavigate } from "react-router";
interface ISellerTableProps {
  data: Customer[];
  total: number;
}

const tableHead = [
  { id: "name", label: "Seller Name" },
  { id: "email", label: "Customer Email" },
  { id: "status", label: "Status" },
];
const customRender: TableCustomRender<Customer> = {
  status: (item: Customer) => renderStatus(item?.status),
};
const CustomersTable = ({ data, total }: ISellerTableProps) => {
  const navigate = useNavigate();
  const { setFalse, setTrue, value } = useBoolean();
  const [sellerId, setSellerId] = useState("");
  const { mutate: deleteMutate } = useDeleteData({
    mutationKey: ["customer"],
    invalidate: ["customer"],
    showToastOnError: true,
    toastSuccessMessage: "Customer deleted successfully",
  });
  const handleDeleteItem = (id: string) => {
    deleteMutate({
      method: "patch",
      url: `/${endpoints.customers.list}/${id}/delete`,
    });
    setFalse();
  };
  const { mutate: editMutate } = useEditData({
    mutationKey: ["customer"],
    invalidate: ["customer"],
    showToastOnError: true,
    toastSuccessMessage: "Customer deleted successfully",
  });
  const changeItemStatus = (id: string, action: string) => {
    editMutate({
      method: "patch",
      url: `/${endpoints.customers.list}/${id}/${action}`,
    });
    setFalse();
  };
  const actions = (item: Customer): TableAction<Customer>[] => [
    ...(item.status === "active" || item.status === "deleted"
      ? [
          {
            title: item.status === "deleted" ? "Restore" : "Delete",
            icon:
              item.status === "deleted" ? (
                <FaUndo color="green" />
              ) : (
                <FaTrash color="red" />
              ),
            onClick: (item: Customer) => {
              if (item.status === "deleted") {
                changeItemStatus(item?.id, "restore-delete");
              } else {
                setSellerId(item?.id);
                setTrue();
              }
            },
          },
        ]
      : []),
    ...(item.status === "active" || item.status === "banned"
      ? [
          {
            title: item.status === "banned" ? "Activate" : "Ban",
            icon:
              item.status === "banned" ? <FaCheck color="green" /> : <FaBan />,
            onClick: (item: Customer) => {
              if (item.status === "banned") {
                changeItemStatus(item?.id, "restore-ban");
              } else {
                changeItemStatus(item?.id, "ban");
              }
            },
          },
        ]
      : []),
    ...(item.status === "pending"
      ? [
          {
            title: "Verify",
            icon: <FaCheck color="green" />,
            onClick: (item: Customer) => {
              if (item.status === "pending") {
                changeItemStatus(item?.id, "active");
              }
            },
          },
        ]
      : []),
    {
      title: "View",
      icon: <FaEye color="black" />,
      onClick: (item: Customer) => {
        navigate(`/customers/${item.id}`);
      },
    },
  ];
  return (
    <>
      <CustomTable<Customer>
        items={isArray<Customer[]>(data)}
        tableHead={tableHead}
        actions={actions}
        customRender={customRender}
        total={total}
      />
      <ConfirmDelete
        open={value}
        onConfirm={() => handleDeleteItem(sellerId)}
        onClose={setFalse}
      />
    </>
  );
};

export default CustomersTable;
