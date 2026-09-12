import {
  ArrowRight,
  Clock,
  Pill,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { reviewService } from "@/services/review.service";
import Image from "next/image";

interface Hero3Props {
  heading?: string;
  description?: string;
  buttons?: {
    primary?: {
      text: string;
      url: string;
      className?: string;
    };
    secondary?: {
      text: string;
      url: string;
    };
  };
  className?: string;
}

const HighlightedWord = ({ text }: { text: string }) => (
  <span className="relative inline-block text-primary">
    {text}
    <svg
      aria-hidden
      viewBox="0 0 220 12"
      preserveAspectRatio="none"
      className="absolute -bottom-1 left-0 h-3 w-full text-primary/30"
    >
      <path
        d="M3 9 C 60 2, 160 2, 217 7"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  </span>
);

const renderHeading = (text: string) => {
  const keyword = "Medicine";
  const parts = text.split(keyword);
  if (parts.length < 2) return text;
  return (
    <>
      {parts[0]}
      <HighlightedWord text={keyword} />
      {parts.slice(1).join(keyword)}
    </>
  );
};

const features = [
  {
    icon: ShieldCheck,
    title: "100% Genuine",
    subtitle: "Verified medicines",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    subtitle: "Within 24 hours",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    subtitle: "Always for you",
  },
];

const getReviewStats = async () => {
  try {
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
    const rating = rated.length
      ? rated.reduce((sum, testimonial) => sum + (testimonial.rating ?? 0), 0) /
        rated.length
      : 0;

    return { count: testimonials.length, avatars, rating };
  } catch (error) {
    console.error("Failed to fetch reviews", error);
    return { count: 0, avatars: [], rating: 0 };
  }
};

const HeroSection = async ({
  heading = "Take Medicine And Fall Away The Disease",
  description = "Your trusted online medicine store, delivering genuine healthcare products right to your doorstep. Order quality medicines online with ease — fast delivery, trusted brands, and care you can rely on.",
  buttons = {
    primary: {
      text: "Register",
      url: "/register",
    },
    secondary: {
      text: "Shop Medicine",
      url: "/shop",
    },
  },
  className,
}: Hero3Props) => {
  const reviews = await getReviewStats();

  return (
    <section
      className={cn("relative overflow-hidden px-4 py-16 lg:py-24", className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,var(--color-primary)/8%,transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 size-112 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 size-[24rem] rounded-full bg-emerald-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)/60%,transparent_0),linear-gradient(to_bottom,var(--color-border)/60%,transparent_0)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)] opacity-40"
      />

      <div className="container relative grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="mx-auto flex flex-col items-center text-center md:ml-auto lg:max-w-2xl lg:items-start lg:text-left">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="size-4" />
            Trusted Online Pharmacy
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
          </div>

          <h1 className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight text-pretty sm:text-5xl lg:text-6xl xl:text-6xl">
            {renderHeading(heading)}
          </h1>

          <p className="mb-8 max-w-xl text-base text-muted-foreground sm:text-lg">
            {description}
          </p>

          <div className="mb-10 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group flex items-center gap-3 rounded-xl border-border/60 bg-card/60 p-3 shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="size-5" />
                </span>
                <span className="text-left">
                  <span className="block text-sm font-semibold leading-tight">
                    {feature.title}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {feature.subtitle}
                  </span>
                </span>
              </Card>
            ))}
          </div>

          {reviews.count > 0 && (
            <div className="mb-8 flex w-fit flex-col items-center gap-4 sm:flex-row   ">
              <span className="inline-flex items-center -space-x-3">
                {reviews.avatars.slice(0, 4).map((avatar, index) => (
                  <Avatar
                    key={index}
                    className="size-11 border-2 border-background shadow-sm"
                  >
                    <AvatarImage src={avatar.src} alt={avatar.alt} />
                    <AvatarFallback>
                      {avatar.alt?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {reviews.avatars.length > 4 && (
                  <span className="flex size-11 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-bold text-primary-foreground shadow-sm">
                    +{reviews.count - 4}
                  </span>
                )}
              </span>
              <div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={cn(
                        "size-4",
                        index < Math.round(reviews.rating ?? 0)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted-foreground/30",
                      )}
                    />
                  ))}
                  <span className="ml-1 text-sm font-semibold">
                    {(reviews.rating ?? 0).toFixed(1)}
                  </span>
                </div>
                <p className="text-left text-sm font-medium text-muted-foreground">
                  from {reviews.count} happy customers
                </p>
              </div>
            </div>
          )}

          <div className="flex w-full flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            {buttons.primary && (
              <Button
                asChild
                size="lg"
                className={cn(
                  "w-full rounded-full px-8 text-base font-semibold shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl sm:w-auto",
                  buttons.primary.className,
                )}
              >
                <a href={buttons.primary.url}>
                  {buttons.primary.text}
                  <ArrowRight className="size-4" />
                </a>
              </Button>
            )}
            {buttons.secondary && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full rounded-full border-2 px-8 text-base font-semibold transition-all hover:-translate-y-0.5 hover:bg-accent sm:w-auto"
              >
                <a href={buttons.secondary.url}>
                  <Pill className="size-4" />
                  {buttons.secondary.text}
                </a>
              </Button>
            )}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[3rem] bg-linear-to-tr from-primary/20 via-transparent to-emerald-500/20 blur-2xl"
          />
          <div
            aria-hidden
            className="absolute -right-4 -top-4 -z-10 size-full rounded-[2.5rem] border-2 border-dashed border-primary/25"
          />

          <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-border/60">
            <Image
              src="https://res.cloudinary.com/dngogzccp/image/upload/v1777030616/medicineBanner_vyrrag.jpg"
              priority
              height={800}
              width={800}
              alt="Medicine Banner"
              className="h-full max-h-[600px] w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { HeroSection };
