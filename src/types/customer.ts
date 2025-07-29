export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "pending" | "active" | "banned" | "deleted";
  createdAt: string;
  updatedAt: string;
  image: string;
};
