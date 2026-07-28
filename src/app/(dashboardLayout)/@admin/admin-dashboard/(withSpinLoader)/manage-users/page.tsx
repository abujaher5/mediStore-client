import UsersClient from "@/components/modules/dashboard/admin/UserClient";

import { userService } from "@/services/user.service";

const AllUsersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) => {
  const { status: statusParam } = await searchParams;
  const status = statusParam || "ACTIVE";
  console.log({ status });
  const { data } = await userService.getAllUsers(status);

  return <UsersClient users={data?.data || []} />;
};

export default AllUsersPage;
