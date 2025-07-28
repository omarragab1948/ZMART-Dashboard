import { endpoints } from "@/services/endpoints";
import { useGetData } from "@/services/actions";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import SellersFilters from "./SellersFilters";
import PageHeader from "@/components/PageHeader";
import TableSkeleton from "@/components/CustomSkeleton";
import SellersTable from "./SellersTable";
import useQueryParams from "@/hooks/useQueryParams";

const Sellers = () => {
  const { useQueryParamsKey } = useQueryParams();
  const { queryKey, queryString } = useQueryParamsKey("seller");
  console.log(queryKey);
  console.log(queryString);
  const { data, isPending } = useGetData({
    queryKey,
    url: `${endpoints.sellers.list}?${queryString}`,
  });

  return (
    <div className="overflow-x-auto pt-10">
      <PageHeader
        title="Sellers"
        links={[{ label: "Sellers", path: "/sellers" }]}
        action={
          <Button asChild className="cursor-pointer">
            <Link to="/sellers/create">Create Seller</Link>
          </Button>
        }
      />
      <SellersFilters />
      {isPending ? (
        <TableSkeleton />
      ) : (
        <SellersTable data={data.data.sellers} total={data.total} />
      )}
    </div>
  );
};

export default Sellers;
