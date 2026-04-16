import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { medicineService } from "@/services/medicine.service";
import Image from "next/image";
import Link from "next/link";

const MedicineDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: medicine } = await medicineService.getMedicineDetails(id);

  return (
    <div>
      <Card
        key={medicine.id}
        className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-2"
      >
        <div className="flex items-center justify-center">
          <Image
            src={medicine.imageUrl}
            priority
            width={400}
            height={300}
            alt={medicine.name}
            className=" object-cover object-center rounded-md"
          />
        </div>

        <CardHeader>
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold  md:text-xl">
              {medicine.name}
            </h3>
            <h4>{medicine.manufacturer}</h4>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <p className="text-muted-foreground">{medicine.description}</p>
            <div className="flex justify-between mt-2 px-2 pt-2">
              <p className="text-lg  font-semibold text-green-500  md:text-xl">
                Stock : {medicine.stock}
              </p>
              <p className="text-lg  font-semibold   md:text-xl">
                Price :
                <span className="text-lg  font-semibold text-yellow-500  md:text-xl pl-2">
                  {medicine.price}
                </span>
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className=" flex justify-center items-center">
          <Link
            href={`/shop/${medicine.id}`}
            className=" text-center uppercase text-foreground w-1/2
                  border-2 px-2 py-1 rounded-lg 
                  hover:text-white hover:bg-gray-400"
          >
            Add To Cart
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MedicineDetailsPage;
