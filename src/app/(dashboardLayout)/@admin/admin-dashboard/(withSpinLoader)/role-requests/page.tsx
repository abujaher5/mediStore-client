import RoleRequestsClient from "@/components/modules/dashboard/admin/RoleRequestsClient";

import { roleChangeRequestServerService } from "@/services/role-change-request.server.service";

const RoleRequestsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) => {
  const { status: statusParam } = await searchParams;
  const status = statusParam || "PENDING";
  const { data } = await roleChangeRequestServerService.getAllRequests(status);

  return <RoleRequestsClient requests={data?.data || []} />;
};

export default RoleRequestsPage;
