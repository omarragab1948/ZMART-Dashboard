import { endpoints } from "@/services/endpoints";
import { useGetData } from "@/services/actions";
import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader";
import TableSkeleton from "@/components/CustomSkeleton";
import useQueryParams from "@/hooks/useQueryParams";
import PermissionsFilters from "./PermissionsFilters";
import PermissionsTable from "./PermissionsTable";
import { useBoolean } from "@/hooks/useBoolean";
import CreateEditPermissionModal from "./Create/CreatePermission";
import { useState } from "react";
import type { Permission } from "@/types/permission";
import ViewEmployeeModal from "./ViewOne/ViewPermission";

const Permissions = () => {
  const { useQueryParamsKey } = useQueryParams();
  const { queryKey, queryString } = useQueryParamsKey("permission");
  const { value, setTrue, setFalse } = useBoolean();
  const {
    value: viewValue,
    setTrue: setViewTrue,
    setFalse: setViewFalse,
  } = useBoolean();

  const [selectedPermission, setSelectedPermission] =
    useState<Permission | null>(null);
  const { data, isPending } = useGetData({
    queryKey,
    url: `${endpoints.permissions.list}?${queryString}`,
  });
  const openCreateModal = () => {
    setTrue();
    setSelectedPermission(null);
  };
  const openEditModal = (permission: Permission) => {
    setTrue();
    setSelectedPermission(permission);
  };
  const openViewModal = (permission: Permission) => {
    setViewTrue();
    setSelectedPermission(permission);
  };
  return (
    <div className="overflow-x-auto pt-10">
      <PageHeader
        title="Permissions"
        links={[{ label: "Permissions", path: "/permissions" }]}
        action={
          <Button className="cursor-pointer" onClick={openCreateModal}>
            Create Permission
          </Button>
        }
      />
      <PermissionsFilters />
      {isPending ? (
        <TableSkeleton />
      ) : (
        <PermissionsTable
          data={data.data.permissions}
          total={data.total}
          openModal={value}
          openEditModal={openEditModal}
          openViewModal={openViewModal}
        />
      )}
      <CreateEditPermissionModal
        open={value}
        onClose={setFalse}
        permission={selectedPermission}
      />
      <ViewEmployeeModal
        open={viewValue}
        onClose={setViewFalse}
        permission={selectedPermission as Permission}
      />
    </div>
  );
};

export default Permissions;
