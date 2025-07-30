import ConfirmDelete from "@/components/ConfirmDelete";
import CustomTable from "@/components/CustomTable";
import { useBoolean } from "@/hooks/useBoolean";
import { useDeleteData, useEditData } from "@/services/actions";
import { endpoints } from "@/services/endpoints";
import type { Employee } from "@/types/employee";
import type { TableAction, TableCustomRender } from "@/types/table";
import isArray from "@/utils/isArray";
import { renderStatus } from "@/utils/renderStatus";
import { useState } from "react";
import { FaBan, FaCheck, FaEye, FaTrash, FaUndo } from "react-icons/fa";
import { useNavigate } from "react-router";

interface IEmployeeTableProps {
  data: Employee[];
  total: number;
}

const tableHead = [
  { id: "name", label: "Employee Name" },
  { id: "email", label: "Employee Email" },
  { id: "status", label: "Status" },
];

const customRender: TableCustomRender<Employee> = {
  status: (item: Employee) => renderStatus(item?.status),
};

const EmployeesTable = ({ data, total }: IEmployeeTableProps) => {
  const { setFalse, setTrue, value } = useBoolean();
  const [employeeId, setEmployeeId] = useState("");
  const navigate = useNavigate();
  const { mutate: deleteMutate } = useDeleteData({
    mutationKey: ["employee"],
    invalidate: ["employee"],
    showToastOnError: true,
    toastSuccessMessage: "Employee deleted successfully",
  });

  const handleDeleteItem = (id: string) => {
    deleteMutate({
      method: "patch",
      url: `/${endpoints.employees.list}/${id}/delete`,
    });
    setFalse();
  };

  const { mutate: editMutate } = useEditData({
    mutationKey: ["employee"],
    invalidate: ["employee"],
    showToastOnError: true,
    toastSuccessMessage: "Employee updated successfully",
  });

  const changeItemStatus = (id: string, action: string) => {
    editMutate({
      method: "patch",
      url: `/${endpoints.employees.list}/${id}/${action}`,
    });
    setFalse();
  };

  const actions = (item: Employee): TableAction<Employee>[] => [
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
            onClick: (item: Employee) => {
              if (item.status === "deleted") {
                changeItemStatus(item?.id, "restore-delete");
              } else {
                setEmployeeId(item?.id);
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
            onClick: (item: Employee) => {
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
            onClick: (item: Employee) => {
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
      onClick: (item: Employee) => {
        navigate(`/employees/${item.id}`);
      },
    },
  ];

  return (
    <>
      <CustomTable<Employee>
        items={isArray<Employee[]>(data)}
        tableHead={tableHead}
        actions={actions}
        customRender={customRender}
        total={total}
      />
      <ConfirmDelete
        open={value}
        onConfirm={() => handleDeleteItem(employeeId)}
        onClose={setFalse}
      />
    </>
  );
};

export default EmployeesTable;
