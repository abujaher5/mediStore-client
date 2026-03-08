import { Contact } from "@/components/modules/homepage/ContactPage";
import { HeroSection } from "@/components/modules/homepage/HeroSection";
import { MedicalEquipment } from "@/components/modules/homepage/MedicalEquipment";
import { cookies } from "next/headers";

export default async function Home() {
  const AUTH_URL = process.env.AUTH_URL;
  const cookieStore = await cookies();
  console.log(cookieStore.toString());

  const res = await fetch(`${AUTH_URL}/get-session`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });
  console.log(await res.json());
  return (
    <div className="flex gap-20 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <MedicalEquipment />
      <Contact />
    </div>
  );
}
