import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { renderStatus } from "@/utils/renderStatus";
import type { Customer } from "@/types/customer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ICustomer {
  customer: Customer;
}
const CustomerInfo = ({ customer }: ICustomer) => {
  const { name, email, status, phone, createdAt, image } = customer;
  return (
    <Card className="p-6 shadow-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={image || "https://github.com/shadcn.png"} />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{name || "Customer Name"}</CardTitle>
          {renderStatus(status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 mt-4">
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
        <p className="text-gray-500 text-sm">
          <strong>Joined:</strong> {new Date(createdAt).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default CustomerInfo;
