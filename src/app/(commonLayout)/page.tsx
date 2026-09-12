import { Contact } from "@/components/modules/homepage/ContactPage";
import FeaturedMedicines from "@/components/modules/homepage/FeaturedMedicines";
import { HeroSection } from "@/components/modules/homepage/HeroSection";
import { MedicalEquipment } from "@/components/modules/homepage/MedicalEquipment";
import Testimonials from "@/components/modules/homepage/Testimonials";

export default async function Home() {
  return (
    <div className="flex gap-0 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <FeaturedMedicines />
      <MedicalEquipment />
      <Testimonials />
      <Contact />
    </div>
  );
}
