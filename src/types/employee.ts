export type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "pending" | "active" | "banned" | "deleted";
  createdAt: string;
  updatedAt: string;
  image?: string;
  permission: {
    id: string;
    name: string;
    description: string;
  };
};
