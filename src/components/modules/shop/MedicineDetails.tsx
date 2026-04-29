"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useCartStore } from "@/store/cartStore";

import { Medicine } from "@/types";
import Image from "next/image";

interface MedicineDetailsProps {
  medicine: Medicine;
}

const MedicineDetails = ({ medicine }: MedicineDetailsProps) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);
  return (
    <div>
      <Card
        key={medicine.id}
        className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-2"
      >
        <p>Total{cart.length}</p>
        <div className="flex items-center justify-center">
          <Image
            src={medicine.imageUrl}
            priority
            width={400}
            height={400}
            alt={medicine.name}
            className=" object-cover rounded-md w-full md:w-1/2 lg:w-1/2 h-full  "
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
          <Button
            onClick={() =>
              addToCart({
                id: medicine.id,
                name: medicine.name,
                price: Number(medicine.price),
                image: medicine.imageUrl,
              })
            }
            className=" text-center uppercase text-foreground w-1/2
                  border-2 px-2 py-1 rounded-lg 
                  hover:text-white hover:bg-gray-400"
          >
            Add To Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MedicineDetails;
