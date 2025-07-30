import { Input } from "@/components/ui/input";
import useQueryParams from "@/hooks/useQueryParams";

const PermissionsFilters = () => {
  const { handleParams, getParamValue } = useQueryParams();
  const name = getParamValue("name") || "";
  // const defaultStatus = getParamValue("status") || "";

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 my-8">
      <Input
        onChange={(e) => handleParams("name", e.target.value)}
        placeholder="Name"
        defaultValue={name}
      />
      
    </div>
  );
};

export default PermissionsFilters;
