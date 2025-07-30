import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, Info, Tag } from "lucide-react";
import type { Permission } from "@/types/permission";
import { convertDate } from "@/utils/convertDate";
import { permissionsOptions } from "../permissions-options";

interface IPermission {
  permission: Permission;
}

const PermissionInfo = ({ permission }: IPermission) => {
  const { name, description, createdAt, permissions } = permission;

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center gap-2">
        <Tag className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">
          {name || "Unnamed Permission"}
        </h2>
      </div>

      <div className="flex items-start gap-2 text-sm text-muted-foreground">
        <Info className="w-4 h-4 mt-1 text-gray-500" />
        <div>
          <p className="font-medium text-gray-700">Description</p>
          <p className="text-gray-600">
            {description || "No description provided."}
          </p>
        </div>
      </div>

      <Separator />

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarDays className="w-4 h-4 text-gray-500" />
        <p>
          <span className="font-medium text-gray-700">Created at: </span>
          {convertDate(createdAt)}
        </p>
      </div>

      {permissions && permissions.length > 0 && (
        <>
          <Separator />
          <div>
            <p className="font-medium text-gray-700 mb-2 text-sm">
              Permissions
            </p>
            <div className="flex flex-wrap gap-2">
              {permissions.map((perm: string) => (
                <Badge key={perm} variant="outline" className="min-w-32">
                  {permissionsOptions?.find((option) => option.value === perm)
                    ?.label || perm}
                </Badge>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PermissionInfo;
