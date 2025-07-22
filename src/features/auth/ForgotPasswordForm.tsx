import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import FormProvider from "@/components/FormProvider";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ForgotPasswordForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const forgotSchema = z.object({
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
  });
  type FormFields = z.infer<typeof forgotSchema>;

  const methods = useForm<FormFields>({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = handleSubmit((data) => {
    // const sendResetLink = async () => {
    //   try {
    //     await postData("/api/v1/users/forgotPassword", data);
    //     toast.success("Password reset link sent. Check your email.");
    //   } catch (err: unknown) {
    //     const error = err as { message: string; status: number };
    //     toast.error(error.message);
    //   }
    // };
    // sendResetLink();
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
          <FormProvider mehtods={methods} onSubmit={onSubmit}>
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

              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full cursor-pointer">
                  Send Reset Link
                </Button>
              </div>
            </div>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
