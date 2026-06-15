import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { sellerService } from "@/services/seller.service";
import { Medicine } from "@/types";
import UpdateMedicineModal from "@/components/modules/dashboard/seller/UpdateMedicineModal";
import DeleteMedicineModal from "@/components/modules/dashboard/seller/DeleteMedicineModal";

const ManageMedicinePage = async () => {
  const { data: medicines } = await sellerService.myMedicines();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Medicines</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Update</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {medicines.map((medicine: Medicine) => (
            <TableRow key={medicine.id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={medicine.imageUrl} />
                </Avatar>
              </TableCell>

              <TableCell>{medicine.name}</TableCell>

              <TableCell> {medicine.price}</TableCell>

              <TableCell>{medicine.stock}</TableCell>

              <TableCell>
                {medicine.stock === 0 ? (
                  <Badge variant="destructive">Out of Stock</Badge>
                ) : medicine.stock < 10 ? (
                  <Badge>Low Stock</Badge>
                ) : (
                  <Badge variant="secondary">In Stock</Badge>
                )}
              </TableCell>

              <TableCell>
                <UpdateMedicineModal medicine={medicine} />
              </TableCell>
              <TableCell>
                <DeleteMedicineModal medicineId={medicine.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageMedicinePage;
