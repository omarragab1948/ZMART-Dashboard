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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import type { Permission } from "@/types/permission";
import { permissionsOptions } from "../permissions-options";

interface IPermissionForm {
  permission?: Permission | null;
  onClose: () => void;
}

const CreatePermissionForm = ({ permission, onClose }: IPermissionForm) => {
  const permissionSchema = z.object({
    name: z.string().nonempty("Name is required"),
    description: z.string().nonempty("Description is required"),
    permissions: z
      .array(z.string())
      .min(1, "At least one permission is required"),
  });

  type FormFields = z.infer<typeof permissionSchema>;

  const methods = useForm<FormFields>({
    resolver: zodResolver(permissionSchema),
    defaultValues: {
      name: permission?.name || "",
      description: permission?.description || "",
      permissions: permission?.permissions || [],
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = methods;

  const { mutate, isPending } = useAddData({
    mutationKey: ["permission"],
    invalidate: ["permission"],
    showToastOnError: true,
    toastSuccessMessage: permission?.id
      ? "Permission updated successfully "
      : "Permission created successfully",
    onSuccess: () => {
      reset();
      onClose();
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (permission) {
      mutate({
        method: "put",
        url: endpoints.permissions.One(permission.id),
        data,
      });
    } else {
      mutate({
        method: "post",
        url: endpoints.permissions.create,
        data,
      });
    }
  });

  return (
    <div className={"p-2 w-full"}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label htmlFor="passwordConfirm">Permissions</Label>
            <Controller
              name="permissions"
              control={control}
              render={({ field: { value, onChange } }) => (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {value.length > 0
                        ? permissionsOptions
                            .filter((opt) => value.includes(opt.value))
                            .map((opt) => opt.label)
                            .join(", ")
                            .slice(0, 25) + "..."
                        : "Select Permissions"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 p-2">
                    {permissionsOptions.map((option) => {
                      const checked = value.includes(option.value);
                      const togglePermission = () => {
                        const newValue = checked
                          ? value.filter((v: string) => v !== option.value)
                          : [...value, option.value];
                        onChange(newValue);
                      };
                      return (
                        <DropdownMenuItem
                          key={option.value}
                          asChild
                          onSelect={(e) => {
                            e.preventDefault();
                            togglePermission();
                          }}
                        >
                          <div className="flex items-center space-x-2 cursor-pointer">
                            <Checkbox
                              checked={checked}
                              id={option.value}
                              className="pointer-events-none"
                            />
                            <span>{option.label}</span>
                          </div>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            />
            {errors.permissions && (
              <p className="text-red-500 text-sm">
                {errors.permissions.message}
              </p>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="description"
                  placeholder="Enter description here"
                />
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
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

export default CreatePermissionForm;
