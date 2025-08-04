import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { renderStatus } from "@/utils/renderStatus";
import type { Employee } from "@/types/employee";
import { convertDate } from "@/utils/convertDate";

interface IEmployee {
  employee: Employee;
}
const EmployeeInfo = ({ employee }: IEmployee) => {
  const { name, email, status, phone, createdAt, image, permission } = employee;
  return (
    <Card className="p-6 shadow-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={image || "https://github.com/shadcn.png"} />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl">{name || "Employee Name"}</CardTitle>
          {renderStatus(status)}
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 mt-4">
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
        <p>
          <strong>Joined:</strong> {convertDate(createdAt)}
        </p>
        <p>
          <strong>Permission Name:</strong> {permission?.name || "N/A"}
        </p>
        <p>
          <strong>Permission Description:</strong>{" "}
          {permission?.description || "N/A"}
        </p>
      </CardContent>
    </Card>
  );
};

export default EmployeeInfo;
