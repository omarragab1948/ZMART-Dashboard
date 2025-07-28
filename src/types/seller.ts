export type Seller = {
  id: string;
  name: string;
  email: string;
  status: "pending" | "active" | "banned" | "deleted";
  storeName: string;
  storeDescription?: string;
  storeLogo?: string;
  createdAt: string;
  updatedAt: string;
  phone?: string;
};
