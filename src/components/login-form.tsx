import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormProvider from "./FormProvider";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAddData } from "@/services/actions";
import { Link } from "react-router";
import { endpoints } from "@/services/endpoints";
import AuthHandlers from "@/features/auth/AuthHandlers";
import type { IUser } from "@/types/user";
import Spinner from "./Spinner";

const loginSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .nonempty("Password is required"),
  // remember_me: Yup.boolean(),
});
type FormFields = z.infer<typeof loginSchema>;
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { loginHandler } = AuthHandlers();

  const methods = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "superadmin@superadmin.com",
      password: "Superadmin@1234",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const { mutate, isPending } = useAddData({
    showToastOnError: true,
    onSuccess: (data: { token: string; data: { user: IUser } }) => {
      console.log(data);
      loginHandler(data?.data?.user, data?.token);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate({
      method: "post",
      url: endpoints.auth.signin,
      data,
    });
  });

  return (
    <div className={cn("p-2 w-full max-w-md", className)} {...props}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="email"
                      type="string"
                      placeholder="m@example.com"
                    />
                  )}
                />
                {errors.email && (
                  <h2 className="text-red-500">{errors.email.message}</h2>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="password"
                      type="string"
                      placeholder="********"
                    />
                  )}
                />

                {errors.password && (
                  <h2 className="text-red-500">{errors.password.message}</h2>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer">
                  {isPending ? <Spinner /> : "Login"}
                </Button>
              </div>
            </div>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
