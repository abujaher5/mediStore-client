import { cn } from "@/lib/utils";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
// import Link from "next/link";
import Image from "next/image";

interface Medicine {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  manufacturer: string;
  sellerId: string;
}

interface Blog7Props {
  tagline: string;
  heading: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  medicines: Medicine[];
  className?: string;
}

const MedicineCard = async ({ className }: Blog7Props) => {
  const data = await fetch("http://localhost:5000/api/medicines", {
    cache: "no-store",
    next: {
      revalidate: 5,
    },
  });
  const medicines: Medicine[] = await data.json();
  return (
    <section className={cn("py-10", className)}>
      <div className="container mx-auto flex flex-col items-center gap-10 lg:px-10">
        <div className="py-4 flex items-center  gap-4">
          <div>Filter by</div>
          <div>
            <input
              type="text"
              className="border-2 py-1 px-2 rounded-md"
              placeholder="Search Medicine"
            />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {medicines.map((medicine) => (
            <Card
              key={medicine.id}
              className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0"
            >
              <div className="flex items-center ">
                <Image
                  src={medicine.imageUrl}
                  priority
                  width={300}
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
                </div>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="text-muted-foreground">
                    {medicine.description}
                  </p>
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
                {/* <Link
                  href={medicine.url}
                  className=" text-center text-foreground w-1/2
                  border-2 px-2 py-1 rounded-lg 
                  hover:text-white hover:bg-gray-400"
                >
                  Medicine Details
                </Link> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export { MedicineCard };
