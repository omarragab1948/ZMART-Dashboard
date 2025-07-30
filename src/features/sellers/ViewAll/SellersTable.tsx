import ConfirmDelete from "@/components/ConfirmDelete";
import CustomTable from "@/components/CustomTable";
import { useBoolean } from "@/hooks/useBoolean";
import { useDeleteData, useEditData } from "@/services/actions";
import { endpoints } from "@/services/endpoints";
import type { Seller } from "@/types/seller";
import type { TableAction, TableCustomRender } from "@/types/table";
import isArray from "@/utils/isArray";
import { renderStatus } from "@/utils/renderStatus";
import { useState } from "react";
import { FaBan, FaCheck, FaEye, FaTrash, FaUndo } from "react-icons/fa";
import { useNavigate } from "react-router";
interface ISellerTableProps {
  data: Seller[];
  total: number;
}

const tableHead = [
  { id: "storeLogo", label: "Store Logo" },
  { id: "storeName", label: "Store Name" },
  { id: "name", label: "Seller Name" },
  { id: "status", label: "Status" },
];
const customRender: TableCustomRender<Seller> = {
  storeLogo: (item: Seller) => (
    <div className="w-15 h-15 rounded-full mx-auto flex">
      <img
        src={item?.storeLogo || "/Image-Not-Found.jpg"}
        alt="Store Logo"
        className="rounded-full"
      />
    </div>
  ),
  status: (item: Seller) => renderStatus(item?.status),
};
const SellersTable = ({ data, total }: ISellerTableProps) => {
  const navigate = useNavigate();
  const { setFalse, setTrue, value } = useBoolean();
  const [sellerId, setSellerId] = useState("");
  const { mutate: deleteMutate } = useDeleteData({
    mutationKey: ["seller"],
    invalidate: ["seller"],
    showToastOnError: true,
    toastSuccessMessage: "Seller deleted successfully",
  });
  const handleDeleteItem = (id: string) => {
    deleteMutate({
      method: "patch",
      url: `/${endpoints.sellers.list}/${id}/delete`,
    });
    setFalse();
  };
  const { mutate: editMutate } = useEditData({
    mutationKey: ["seller"],
    invalidate: ["seller"],
    showToastOnError: true,
    toastSuccessMessage: "Seller deleted successfully",
  });
  const changeItemStatus = (id: string, action: string) => {
    editMutate({
      method: "patch",
      url: `/${endpoints.sellers.list}/${id}/${action}`,
    });
    setFalse();
  };
  const actions = (item: Seller): TableAction<Seller>[] => [
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
            onClick: (item: Seller) => {
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
            onClick: (item: Seller) => {
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
            onClick: (item: Seller) => {
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
      onClick: (item: Seller) => {
        navigate(`/sellers/${item.id}`);
      },
    },
  ];
  return (
    <>
      <CustomTable<Seller>
        items={isArray<Seller[]>(data)}
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

export default SellersTable;
