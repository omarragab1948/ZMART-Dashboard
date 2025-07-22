import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AuthHandlers from "./AuthHandlers";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import FormProvider from "@/components/FormProvider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

const ResetPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const { token } = useParams();
  const { loginHandler } = AuthHandlers();
  const schema = z
    .object({
      password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters"),
      passwordConfirm: z.string().nonempty("Please confirm your password"),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    });

  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit((data) => {
    // const resetPassword = async () => {
    //   try {
    //     const res = await patchData(
    //       `/api/v1/users/resetPassword/${token}`,
    //       data
    //     );
    //     console.log(res);
    //     toast.success("Password reset successful!");
    //     loginHandler(res.data.user, res.token);
    //   } catch (err: unknown) {
    //     const error = err as { message: string; status: number };
    //     toast.error(error.message);
    //   }
    // };
    // resetPassword();
  });

  return (
    <div className={cn("p-2 w-full max-w-md", className)} {...props}>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter your new password below to reset your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormProvider mehtods={methods} onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="password">New Password</Label>
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
              <div className="grid gap-3">
                <Label htmlFor="passwordConfirm">Confirm Password</Label>
                <Controller
                  name="passwordConfirm"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      id="passwordConfirm"
                      type="password"
                      placeholder="********"
                    />
                  )}
                />
                {errors.passwordConfirm && (
                  <p className="text-red-500 text-sm">
                    {errors.passwordConfirm.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer">
                  Reset Password
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Remembered your password?
                <Link to="/" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </div>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
