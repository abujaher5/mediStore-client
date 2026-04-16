import { Contact } from "@/components/modules/homepage/ContactPage";
import { HeroSection } from "@/components/modules/homepage/HeroSection";
import { MedicalEquipment } from "@/components/modules/homepage/MedicalEquipment";
import { medicineService } from "@/services/medicine.service";
// import { env } from "@/env";
// import { userService } from "@/services/user.services";
// import { cookies } from "next/headers";

export default async function Home() {
  // const AUTH_URL = env.AUTH_URL;
  // const cookieStore = await cookies();

  // const res = await fetch(`${AUTH_URL}/get-session`, {
  //   headers: {
  //     Cookie: cookieStore.toString(),
  //   },
  //   cache: "no-store",
  // });

  // console.log(await res.json());

  // const { data } = await userService.getSession();
  // console.log(data, "From Home page");

  // const data = await medicineService.getAllMedicines();
  // console.log(data);
  return (
    <div className="flex gap-20 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <MedicalEquipment />
      <Contact />
    </div>
  );
}
