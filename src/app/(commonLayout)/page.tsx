import { HeroSection } from "@/components/modules/homepage/HeroSection";
import { MedicalEquipment } from "@/components/modules/homepage/MedicalEquipment";

export default function Home() {
  return (
    <div className="flex gap-20 flex-col  min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <MedicalEquipment />
    </div>
  );
}
