import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import AuthPagesLayout from "./AuthPagesLayout/AuthPagesLayout";
import LoginPage from "./features/auth/LoginPage";
import ForgotPassPage from "./features/auth/ForgotPassPage";
import ResetPassPage from "./features/auth/ResetPassPage";
import AuthLayout from "./AuthPagesLayout/AuthLayout";
import Sellers from "./features/sellers/ViewAll/Sellers";
import Customers from "./features/customers/Customers";
import Employees from "./features/employees/Employees";
import CreateSeller from "./features/sellers/Create/CreateSellerForm";
import ViewSeller from "./features/sellers/ViewOne/ViewSeller";
import ViewEmployee from "./features/employees/ViewOne/ViewEmployee";
import ViewCustomer from "./features/customers/ViewOne/ViewCustomer";
import CreateCustomer from "./features/customers/Create/CreateCustomer";
import CreateEmployee from "./features/employees/Create/CreateEmployee";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<AuthPagesLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="forgot-password" element={<ForgotPassPage />} />
          <Route path="reset-password/:token" element={<ResetPassPage />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<div>dashboard</div>} />
          <Route path="/sellers">
            <Route index element={<Sellers />} />
            <Route path="create" element={<CreateSeller />} />
            <Route path=":id" element={<ViewSeller />} />
          </Route>
          <Route path="/customers">
            <Route index element={<Customers />} />
            <Route path="create" element={<CreateCustomer />} />
            <Route path=":id" element={<ViewCustomer />} />
          </Route>
          <Route path="/employees">
            <Route index element={<Employees />} />
            <Route path="create" element={<CreateEmployee />} />
            <Route path=":id" element={<ViewEmployee />} />
          </Route>
          <Route path="permissions" element={<ResetPassPage />} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
