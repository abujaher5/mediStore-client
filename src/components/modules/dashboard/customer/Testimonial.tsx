"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const Testimonial = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  // show 3 cards
  const cardsToShow = 3;

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  // visible cards logic
  const visibleTestimonials = Array.from(
    { length: Math.min(cardsToShow, testimonials.length) },
    (_, i) => testimonials[(active + i) % testimonials.length],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-20 relative">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 group flex h-10 w-10 items-center justify-center rounded-full  shadow-md hover:bg-green-300"
      >
        <IconArrowLeft className="h-5 w-5 transition-transform group-hover:rotate-12" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 group flex h-10 w-10 items-center justify-center rounded-full  shadow-md hover:bg-green-300"
      >
        <IconArrowRight className="h-5 w-5 transition-transform group-hover:-rotate-12" />
      </button>

      {/* Cards */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12"
        >
          {visibleTestimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="p-6 rounded-2xl shadow-lg min-h-[250px] flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex gap-4">
                <Avatar className="size-12 rounded-full ring-1 ring-input">
                  <AvatarImage
                    src={
                      testimonial.src ||
                      `https://api.dicebear.com/9.x/initials/svg?seed=${testimonial.name}`
                    }
                    alt={testimonial.name}
                  />
                  <AvatarFallback>{testimonial.name?.charAt(0)}</AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>

                  <p className="text-sm text-muted-foreground">
                    {testimonial.designation}
                  </p>
                </div>
              </div>

              {/* Quote */}
              <div className="mt-5 text-muted-foreground leading-7">
                <q>
                  {testimonial.quote.split(" ").map((word, index) => (
                    <motion.span
                      key={index}
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        delay: 0.02 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </q>
              </div>
            </Card>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
