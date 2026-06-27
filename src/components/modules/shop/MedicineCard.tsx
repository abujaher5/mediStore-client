import { Card, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { Medicine } from "@/types";
import Link from "next/link";

const MedicineCard = async ({ medicine }: { medicine: Medicine }) => {
  return (
    <div>
      <Card
        key={medicine.id}
        className="group relative overflow-hidden rounded-2xl border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-teal-400 via-emerald-500 to-teal-600" />

        <div className="relative bg-linear-to-b from-teal-50 to-emerald-50 flex items-center justify-center p-6 h-52 overflow-hidden">
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-teal-100/60" />
          <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-emerald-100/60" />

          <Image
            src={medicine.imageUrl}
            priority
            width={300}
            height={300}
            alt={medicine.name}
            className="relative z-10 object-cover w-40 h-40 drop-shadow-md group-hover:scale-125 transition-transform duration-300"
          />
        </div>

        <div className="p-5 grid gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-900 leading-tight">
              {medicine.name}
            </h3>

            <p className="text-xs font-medium text-teal-600 uppercase tracking-widest mt-0.5">
              {medicine.manufacturer}
            </p>
          </div>

          <div className="h-px bg-linear-to-r from-teal-100 via-emerald-200 to-transparent" />

          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
            {medicine.description}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-black text-sm font-semibold px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              Stock: <span className="text-green-700">{medicine.stock}</span>
            </span>

            <span className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-bold px-3 py-1.5 rounded-full ml-auto">
              ৳ {medicine.price}
            </span>
          </div>

          <CardFooter className="px-0 pt-2">
            <Link
              href={`/shop/${medicine.id}`}
              className="w-full text-center bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-white font-semibold rounded-xl py-3 shadow-md hover:shadow-lg transition-all duration-200"
            >
              Medicine Details
            </Link>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
};

export { MedicineCard };
