import { Contact } from "@/components/modules/homepage/ContactPage";
import { HeroSection } from "@/components/modules/homepage/HeroSection";
import { MedicalEquipment } from "@/components/modules/homepage/MedicalEquipment";
import Testimonials from "@/components/modules/homepage/Testimonials";
import { reviewService } from "@/services/review.service";

export default async function Home() {
  const reviewsResponse = await reviewService.getAllReviews();
  const testimonials: {
    id: string;
    name: string;
    rating?: number;
    src: string;
  }[] = reviewsResponse?.data ?? [];

  const avatars = testimonials.map((testimonial) => ({
    src:
      testimonial.src ||
      `https://api.dicebear.com/9.x/initials/svg?seed=${testimonial.name}`,
    alt: testimonial.name,
  }));

  const rated = testimonials.filter(
    (testimonial) => typeof testimonial.rating === "number",
  );
  const averageRating = rated.length
    ? rated.reduce((sum, testimonial) => sum + (testimonial.rating ?? 0), 0) /
      rated.length
    : 0;

  return (
    <div className="flex gap-0 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HeroSection
        reviews={{
          count: testimonials.length,
          rating: averageRating,
          avatars,
        }}
      />
      <MedicalEquipment />
      <Testimonials />
      <Contact />
    </div>
  );
}
