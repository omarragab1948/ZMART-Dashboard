import { endpoints } from "@/services/endpoints";
import { useGetData } from "@/services/actions";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import PageHeader from "@/components/PageHeader";
import TableSkeleton from "@/components/CustomSkeleton";
import EmployeesTable from "./EmployeesTable";
import EmployeesFilters from "./EmployeesFilters";
import useQueryParams from "@/hooks/useQueryParams";

const Employees = () => {
  const { useQueryParamsKey } = useQueryParams();
  const { queryKey, queryString } = useQueryParamsKey("employee");

  const { data, isPending } = useGetData({
    queryKey,
    url: `${endpoints.employees.list}?${queryString}`,
  });

  return (
    <div className="overflow-x-auto pt-10">
      <PageHeader
        title="Employees"
        links={[{ label: "Employees", path: "/employees" }]}
        action={
          <Button asChild className="cursor-pointer">
            <Link to="/employees/create">Create Employee</Link>
          </Button>
        }
      />
      <EmployeesFilters />
      {isPending ? (
        <TableSkeleton />
      ) : (
        <EmployeesTable data={data.data.employees} total={data.total} />
      )}
    </div>
  );
};

export default Employees;
