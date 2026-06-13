import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { sellerService } from "@/services/seller.service";
import { Medicine } from "@/types";
import { Pencil, Trash2 } from "lucide-react";

const MyMedicinesPage = async () => {
  const { data: medicines } = await sellerService.myMedicines();
  console.log("My medicines", medicines);
  return (
    <div>
      <Table>
        <TableCaption>My Medicines</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {medicines.map((medicine: Medicine) => (
            <TableRow key={medicine.id}>
              <TableCell>{medicine.id}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={medicine.imageUrl} />
                </Avatar>
              </TableCell>
              <TableCell>{medicine.name}</TableCell>
              <TableCell>{medicine.price}</TableCell>
              <TableCell>{medicine.stock}</TableCell>

              {/* <TableCell>
                <Button variant="outline" size="sm">
                  <Pencil className="w-4 h-4" />
                </Button>
              </TableCell>

              <TableCell>
                <Button variant="destructive" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyMedicinesPage;
