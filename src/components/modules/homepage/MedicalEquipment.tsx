"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";

interface EquipmentItem {
  id: string;
  title: string;
  summary: string;
  image: string;
  url?: string;
}

interface MedicalEquipmentProps {
  heading?: string;
  description?: string;
  items?: EquipmentItem[];
  className?: string;
}

const defaultItems: EquipmentItem[] = [
  {
    id: "1",
    title: "Digital X-Ray Machine",
    summary:
      "High-resolution imaging system for fast and accurate diagnostics.",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200",
  },
  {
    id: "2",
    title: "Patient Monitor",
    summary:
      "Real-time monitoring of ECG, oxygen level, pulse, and blood pressure.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200",
  },
  {
    id: "3",
    title: "Wheelchair",
    summary:
      "Comfortable and durable mobility support for patients and seniors.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
  },
  {
    id: "4",
    title: "Surgical Equipment",
    summary:
      "Premium-grade tools designed for precision and safety in surgery.",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200",
  },
  {
    id: "5",
    title: "Nebulizer Machine",
    summary:
      "Efficient respiratory treatment device for asthma and breathing care.",
    image:
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=1200",
  },
];

export function MedicalEquipment({
  heading = "Advanced Medical Equipment",
  description = "Reliable modern healthcare devices for hospitals, clinics, and home care.",
  items = defaultItems,
  className,
}: MedicalEquipmentProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };

    update();
    api.on("select", update);

    return () => {
      api.off("select", update);
    };
  }, [api]);

  return (
    <section
      className={cn("py-4 w-full max-w-full overflow-hidden", className)}
    >
      <div className="w-full max-w-7xl mx-auto px-4 overflow-hidden">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl mx-auto text-center">
            <p className="mb-2 text-xl font-semibold uppercase tracking-widest text-primary">
              Healthcare Solutions
            </p>

            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              {heading}
            </h2>

            <p className="mt-4 text-sm text-muted-foreground md:text-base">
              {description}
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              disabled={!canPrev}
              onClick={() => api?.scrollPrev()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              disabled={!canNext}
              onClick={() => api?.scrollNext()}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <Carousel setApi={setApi} className="w-full overflow-hidden">
          <CarouselContent className="ml-0">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 px-2"
              >
                <a
                  href={item.url || "#"}
                  className="group block h-full rounded-2xl border bg-background shadow-sm transition-all duration-300 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="overflow-hidden rounded-t-2xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={500}
                      height={500}
                      className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{item.title}</h3>

                    <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                      {item.summary}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                      Learn More
                      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
