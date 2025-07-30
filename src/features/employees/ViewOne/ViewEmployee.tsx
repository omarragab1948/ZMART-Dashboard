import PageHeader from "@/components/PageHeader";
import { useGetData } from "@/services/actions";
import { endpoints } from "@/services/endpoints";
import { useParams } from "react-router";

import CustomSkeleton from "@/components/CustomSkeleton";
import EmployeeInfo from "./EmployeeInfo";

const ViewEmployee = () => {
  const { id: employeeId } = useParams();
  const { data, isPending } = useGetData({
    queryKey: ["employee", employeeId as string],
    url: endpoints.employees.getOne(employeeId as string),
  });

  const employee = data?.data?.employee || {};

  return (
    <div className="p-4 space-y-6">
      <PageHeader
        title={`employee: ${employee?.name}`}
        links={[
          { path: "/employee", label: "Employee" },
          { path: `/employee/${employeeId}`, label: "View Employee" },
        ]}
      />
      {isPending ? (
        <CustomSkeleton length={7} />
      ) : (
        <EmployeeInfo employee={employee} />
      )}
    </div>
  );
};

export default ViewEmployee;
