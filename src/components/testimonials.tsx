import { reviewService } from "@/services/review.service";
import { Testimonial } from "./modules/dashboard/customer/Testimonial";

export default async function Testimonials() {
  const reviews = await reviewService.getAllReviews();

  return <Testimonial testimonials={reviews.data} />;
}
