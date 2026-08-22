import { EditProfile } from "@/components/modules/dashboard/shared/Profile/EditProfile";
import { userService } from "@/services/user.service";

const ManageProfilePage = async () => {
  const { data } = await userService.getMe();
  const user = data?.data;
  return (
    <div>
      <EditProfile user={user} />
    </div>
  );
};

export default ManageProfilePage;
