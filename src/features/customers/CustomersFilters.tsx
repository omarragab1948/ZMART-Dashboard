import { CustomSelectFilter } from "@/components/CustomSelectFilter";
import { Input } from "@/components/ui/input";
import useQueryParams from "@/hooks/useQueryParams";

const CustomersFilters = () => {
  const { handleParams, getParamValue } = useQueryParams();
  const defaultStatus = getParamValue("status") || "";
  const name = getParamValue("name") || "";

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 my-8">
      <Input
        onChange={(e) => handleParams("name", e.target.value)}
        placeholder="Customer Name"
        defaultValue={name}
      />
      <CustomSelectFilter
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

export default CustomersFilters;
