import { useReadRequest } from "@/services/actions";
import { endpoints } from "@/services/endpoints";

const Products = () => {
  const { data } = useReadRequest({
    queryKey: ["products"],
    url: endpoints.products.list,
  });
  console.log(data);
  return <div>Products</div>;
};

export default Products;
