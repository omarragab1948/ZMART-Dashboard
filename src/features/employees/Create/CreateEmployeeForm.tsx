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
import CustomImageInput from "@/components/CustomImageInput";
import { useNavigate } from "react-router";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
const options = [
  { label: "All", value: "all" },
  { label: "Banned", value: "banned" },
  { label: "Pending", value: "pending" },
  { label: "Active", value: "active" },
  { label: "Deleted", value: "deleted" },
];
const CreateEmployeeForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState<string[]>([]);
  const sellerSchema = z
    .object({
      name: z.string().nonempty("Name is required"),
      email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),
      phone: z.string(),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .nonempty("Password is required"),
      passwordConfirm: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .nonempty("Password confirmation is required"),
      image: z.file().nullable(),
      role: z.string(),
      status: z.string().nonempty("Status is required"),
      permissions: z.array(z.string()).optional(),
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
      image: null,
      role: "Employee",
      status: "active",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    reset,
  } = methods;
  const onChange = (val: string) => {
    setPermissions((prev) =>
      prev.includes(val) ? prev.filter((p) => p !== val) : [...prev, val]
    );
    setValue(
      "permissions",
      permissions.includes(val)
        ? permissions.filter((p) => p !== val)
        : [...permissions, val]
    );
  };
  const { mutate, isPending } = useAddData({
    mutationKey: ["customer"],
    invalidate: ["customer"],
    showToastOnError: true,
    toastSuccessMessage: "Employee created successfully",
    onSuccess: () => {
      reset();
      navigate(-1);
    },
  });

  const onSubmit = handleSubmit((data) => {
    // mutate({
    //   method: "post",
    //   url: endpoints.employees.create,
    //   data,
    // });
  });

  return (
    <div className={cn("p-2 w-full", className)} {...props}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-3 md:col-span-2">
            <Controller
              name="image"
              control={control}
              render={() => <CustomImageInput title="Image" id="image" />}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mx-auto">
                {errors.image.message}
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
            <Label htmlFor="passwordConfirm">Permissions</Label>
            <Controller
              name="permissions"
              control={control}
              render={() => (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {permissions.length > 0
                        ? `${permissions.join(", ")}`
                        : "Select Permissions"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 p-2">
                    {options.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={(e) => e.preventDefault()}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <DropdownMenuContent className="w-56 p-2">
                          {options.map((option) => (
                            <DropdownMenuItem
                              key={option.value}
                              asChild
                              onSelect={(e) => e.preventDefault()} // منع الإغلاق الافتراضي
                            >
                              <div
                                className="flex items-center space-x-2 cursor-pointer"
                                onClick={() => {
                                  const checked = !permissions.includes(
                                    option.value
                                  );
                                  if (option.value === "all") {
                                    if (checked) {
                                      const allValues = options.map(
                                        (o) => o.value
                                      );
                                      setPermissions(allValues);
                                      setValue("permissions", allValues);
                                    } else {
                                      setPermissions([]);
                                      setValue("permissions", []);
                                    }
                                  } else {
                                    const updatedPermissions = checked
                                      ? [...permissions, option.value]
                                      : permissions.filter(
                                          (p) => p !== option.value
                                        );
                                    setPermissions(updatedPermissions);
                                    setValue("permissions", updatedPermissions);
                                  }
                                }}
                              >
                                <Checkbox
                                  checked={permissions.includes(option.value)}
                                  id={option.value}
                                  className="pointer-events-none cursor-pointer"
                                />
                                <span>{option.label}</span>
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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

export default CreateEmployeeForm;
