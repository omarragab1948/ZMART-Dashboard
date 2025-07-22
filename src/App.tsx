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
import Products from "./pages/Products";

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
          <Route path="/products" element={<Products />} />
          <Route path="about" element={<div>About</div>} />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
