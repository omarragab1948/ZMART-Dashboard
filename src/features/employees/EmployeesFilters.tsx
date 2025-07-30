import { CustomSelectFilter } from "@/components/CustomSelectFilter";
import { Input } from "@/components/ui/input";
import useQueryParams from "@/hooks/useQueryParams";

const EmployeesFilters = () => {
  const { handleParams, getParamValue } = useQueryParams();
  const name = getParamValue("name") || "";
  const defaultStatus = getParamValue("status") || "";

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 my-8">
      <Input
        onChange={(e) => handleParams("name", e.target.value)}
        placeholder="Employee Name"
        defaultValue={name}
      />
      <CustomSelectFilter
        placeholder="Status"
        defaultValue={defaultStatus}
        options={[
          { label: "All", value: "all" },
          { label: "Banned", value: "banned" },
          { label: "Pending", value: "pending" },
          { label: "Active", value: "active" },
          { label: "Deleted", value: "deleted" },
        ]}
        onChange={(val) => handleParams("status", val === "all" ? "" : val)}
      />
    </div>
  );
};

export default EmployeesFilters;
