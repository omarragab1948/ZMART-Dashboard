import { endpoints } from "@/services/endpoints";
import { useGetData } from "@/services/actions";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import PageHeader from "@/components/PageHeader";
import TableSkeleton from "@/components/CustomSkeleton";
import CustomersTable from "./CustomersTable";
import CustomersFilters from "./CustomersFilters";
import useQueryParams from "@/hooks/useQueryParams";

const Customers = () => {
  const { useQueryParamsKey } = useQueryParams();
  const { queryKey, queryString } = useQueryParamsKey("customer");
  const { data, isPending } = useGetData({
    queryKey,
    url: `${endpoints.customers.list}?${queryString}`,
  });
  console.log(data);
  console.log(queryKey);
  console.log(queryString);
  return (
    <div className="overflow-x-auto pt-10">
      <PageHeader
        title="Customers"
        links={[{ label: "Customers", path: "/customers" }]}
        action={
          <Button asChild className="cursor-pointer">
            <Link to="/customers/create">Create Customer</Link>
          </Button>
        }
      />
      <CustomersFilters />
      {isPending ? (
        <TableSkeleton />
      ) : (
        <CustomersTable data={data.data.customers} total={data.total} />
      )}
    </div>
  );
};

export default Customers;
