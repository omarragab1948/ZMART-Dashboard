import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAddData } from "@/services/actions";
import { endpoints } from "@/services/endpoints";
import FormProvider from "@/components/FormProvider";
import Spinner from "@/components/Spinner";
import { Textarea } from "@/components/ui/textarea";
import CustomImageInput from "@/components/CustomImageInput";
import { useNavigate } from "react-router";

const CreateSellerForm = ({ className, ...props }: React.ComponentProps<"div">) => {
  const navigate = useNavigate();
  const sellerSchema = z
    .object({
      name: z.string().nonempty("Name is required"),
      email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),
      phone: z.string().nonempty("Phone is required"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .nonempty("Password is required"),
      passwordConfirm: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .nonempty("Password confirmation is required"),
      storeName: z.string().nonempty("Store name is required"),
      storeLogo: z.file("Store logo is required").nullable(),
      storeDescription: z.string().optional(),
      role: z.string().nonempty("Role is required"),
      status: z.string().nonempty("Status is required"),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    });

  type FormFields = z.infer<typeof sellerSchema>;

  const methods = useForm<FormFields>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
      storeName: "",
      storeLogo: undefined,
      storeDescription: "",
      role: "Seller",
      status: "active",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;

  const { mutate, isPending } = useAddData({
    mutationKey: ["seller"],
    invalidate: ["seller"],
    showToastOnError: true,
    toastSuccessMessage: "Seller created successfully",
    onSuccess: () => {
      reset();
      navigate(-1);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutate({
      method: "post",
      url: endpoints.sellers.create,
      data,
    });
  });

  return (
    <div className={cn("p-2 w-full", className)} {...props}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-3 md:col-span-2">
            <Controller
              name="storeLogo"
              control={control}
              render={() => (
                <CustomImageInput title="Store Logo" id="storeLogo" />
              )}
            />
            {errors.storeLogo && (
              <p className="text-red-500 text-sm mx-auto">
                {errors.storeLogo.message}
              </p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} id="name" placeholder="John Doe" />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="phone">Phone</Label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="phone"
                  type="text"
                  placeholder="123456789"
                />
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="storeName">Store Name</Label>
            <Controller
              name="storeName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="storeName"
                  placeholder="My Awesome Store"
                />
              )}
            />
            {errors.storeName && (
              <p className="text-red-500 text-sm">{errors.storeName.message}</p>
            )}
          </div>

          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  id="password"
                  type="password"
                  placeholder="********"
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
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
          <div className="grid gap-3">
            <Label htmlFor="storeDescription">Store Description</Label>
            <Controller
              name="storeDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="storeDescription"
                  placeholder="Describe your store..."
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-3 md:col-span-2">
            <Button type="submit" className="w-full cursor-pointer">
              {isPending ? <Spinner /> : "Create Seller"}
            </Button>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

export default CreateSellerForm;
