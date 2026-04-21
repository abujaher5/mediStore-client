import UsersClient from "@/components/modules/dashboard/admin/UserClient";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
import { userService } from "@/services/user.service";
// import { User } from "@/types";
// import { Pencil, Trash2 } from "lucide-react";

const AllUsersPage = async () => {
  const { data } = await userService.getAllUsers();

  return <UsersClient users={data || []} />;

  // (
  //   <div>
  //     <Table>
  //       <TableCaption>All Users</TableCaption>
  //       <TableHeader>
  //         <TableRow>
  //           <TableHead>id</TableHead>
  //           <TableHead>Name</TableHead>
  //           <TableHead>Email</TableHead>
  //           <TableHead>Role</TableHead>
  //           <TableHead>Status</TableHead>
  //           <TableHead>Update Status</TableHead>
  //           <TableHead>Delete User</TableHead>
  //         </TableRow>
  //       </TableHeader>
  //       <TableBody>
  //         {data?.map((user: User) => (
  //           <TableRow key={user.id}>
  //             <TableCell className="font-medium">{user.id}</TableCell>
  //             <TableCell>{user.name}</TableCell>
  //             <TableCell>{user.email}</TableCell>
  //             <TableCell>{user.role}</TableCell>
  //             <TableCell>{user.status}</TableCell>

  //             <TableCell className="items-center justify-center flex text-green-400">
  //               <Button
  //                 variant="outline"
  //                 size="sm"
  //                 // onClick={() => onUpdateStatus(user.id)}
  //                 className="flex items-center gap-2"
  //               >
  //                 <Pencil className="w-4 h-4" />
  //               </Button>
  //             </TableCell>

  //             <TableCell className="text-red-500 text-center ">
  //               <Button
  //                 variant="destructive"
  //                 size="sm"
  //                 // onClick={() => onDelete(userId)}
  //               >
  //                 <Trash2 className="w-4 h-4" />
  //               </Button>
  //             </TableCell>
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </div>
  // );
};

export default AllUsersPage;
