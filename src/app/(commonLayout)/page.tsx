// import { Testimonial } from "@/components/modules/dashboard/customer/Testimonial";
import { Contact } from "@/components/modules/homepage/ContactPage";
import { HeroSection } from "@/components/modules/homepage/HeroSection";
import { MedicalEquipment } from "@/components/modules/homepage/MedicalEquipment";
import Testimonials from "@/components/testimonials";

export default async function Home() {
  return (
    <div className="flex gap-0 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection />
      <MedicalEquipment />
      <Testimonials />
      <Contact />
    </div>
  );
}
