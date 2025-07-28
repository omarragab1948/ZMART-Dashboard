import PageHeader from "@/components/PageHeader";
import { useGetData } from "@/services/actions";
import { endpoints } from "@/services/endpoints";
import { useParams } from "react-router";
import CustomSkeleton from "@/components/CustomSkeleton";
import CustomerInfo from "./CustomerInfo";

const ViewCustomer = () => {
  const { id: customerId } = useParams();
  const { data, isPending } = useGetData({
    queryKey: ["customer", customerId as string],
    url: endpoints.customers.getOne(customerId as string),
  });

  const customer = data?.data?.customer || {};

  return (
    <div className="p-4 space-y-6">
      <PageHeader
        title={`Customer: ${customer?.name}`}
        links={[
          { path: "/customers", label: "Customers" },
          { path: `/customers/${customer}`, label: "View Customer" },
        ]}
      />
      {isPending ? (
        <CustomSkeleton length={7} />
      ) : (
        <CustomerInfo customer={customer} />
      )}
    </div>
  );
};

export default ViewCustomer;
