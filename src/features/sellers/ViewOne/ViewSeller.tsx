import PageHeader from "@/components/PageHeader";
import { useGetData } from "@/services/actions";
import { endpoints } from "@/services/endpoints";
import { useParams } from "react-router";

import SellerInfo from "./SellerInfo";
import CustomSkeleton from "@/components/CustomSkeleton";

const ViewSeller = () => {
  const { id: sellerId } = useParams();
  const { data, isPending } = useGetData({
    queryKey: ["seller", sellerId as string],
    url: endpoints.sellers.getOne(sellerId as string),
  });

  const seller = data?.data?.seller || {};

  return (
    <div className="p-4 space-y-6">
      <PageHeader
        title={`Seller: ${seller?.name}`}
        links={[
          { path: "/sellers", label: "Sellers" },
          { path: `/sellers/${sellerId}`, label: "View Seller" },
        ]}
      />
      {isPending ? (
        <CustomSkeleton length={7} />
      ) : (
        <SellerInfo seller={seller} />
      )}
    </div>
  );
};

export default ViewSeller;
