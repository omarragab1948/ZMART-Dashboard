import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { Seller } from "@/types/seller";
import { renderStatus } from "@/utils/renderStatus";

interface ISeller {
  seller: Seller;
}
const SellerInfo = ({ seller }: ISeller) => {
  const {
    name,
    email,
    status,
    storeName,
    storeDescription,
    phone,
    createdAt,
    storeLogo,
  } = seller;
  return (
    <Card className="p-6 shadow-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={storeLogo || "https://github.com/shadcn.png"} />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">
            {storeName || "No Store Name"}
          </CardTitle>
          {renderStatus(status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 mt-4">
        <p>
          <strong>Seller Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
        <p>
          <strong>Description:</strong> {storeDescription || "No description"}
        </p>
        <p className="text-gray-500 text-sm">
          <strong>Joined:</strong> {new Date(createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default SellerInfo;
