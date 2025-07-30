import { Badge } from "@/components/ui/badge";

export const renderStatus = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge variant="outline" className="bg-green-500 text-white">
          Active
        </Badge>
      );
    case "banned":
      return (
        <Badge variant="secondary" className="bg-red-100 text-red-600">
          Banned
        </Badge>
      );
    case "deleted":
      return <Badge variant="destructive">Deleted</Badge>;
    case "pending":
    default:
      return <Badge className="bg-yellow-100 text-yellow-600">Pending</Badge>;
  }
};
