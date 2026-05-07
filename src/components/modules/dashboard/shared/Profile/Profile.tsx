import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userService } from "@/services/user.service";

export const Profile = async () => {
  const { data } = await userService.getSession();
  const user = data?.user;
  return (
    <div>
      <div className="w-1/2 lg:w-1/3 mx-auto">
        <h2 className="text-3xl py-4 text-center uppercase"> Your Profile</h2>
        <Card>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">
                  Email: {user.email}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{user.phone}</p>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="font-medium">{user.role}</p>
              </div>
              <div>{/* <Profile /> */}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
