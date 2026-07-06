import UsersClient from "@/components/modules/dashboard/admin/UserClient";

import { userService } from "@/services/user.service";

const AllUsersPage = async () => {
  const { data } = await userService.getAllUsers();

  return <UsersClient users={data || []} />;
};

export default AllUsersPage;
