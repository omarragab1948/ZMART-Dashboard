export const endpoints = {
  auth: {
    signin: "/auth/signin",
  },
  sellers: {
    list: "sellers",
    create: "sellers/create",
    getOne: (id: string) => `sellers/${id}`,
  },
  customers: {
    list: "customers",
    getOne: (id: string) => `customers/${id}`,
    create: "customers/create",
  },
  employees: {
    list: "employees",
    getOne: (id: string) => `employees/${id}`,
    create: "employees/create",
  },
  permissions: {
    list: "permissions",
    getOne: (id: string) => `permissions/${id}`,
    create: "permissions/create",
  },
};
