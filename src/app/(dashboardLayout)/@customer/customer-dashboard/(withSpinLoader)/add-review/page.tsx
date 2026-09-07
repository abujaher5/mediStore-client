"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/get-logged-user";
import { reviewService } from "@/services/review.service";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader2, Quote, RotateCcw, Star, BadgeCheck } from "lucide-react";

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very good", "Excellent"];
const MIN_CHARS = 10;
const MAX_CHARS = 500;

const initialForm = {
  quote: "",
  designation: "",
  rating: 0,
};

export default function AddReview() {
  const { user } = useCurrentUser();

  const [loading, setLoading] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [formData, setFormData] = useState(initialForm);

  const activeRating = hoveredRating || formData.rating;
  const isValid =
    formData.quote.trim().length >= MIN_CHARS &&
    formData.designation.trim() &&
    formData.rating > 0;

  const handleSubmit = async () => {
    if (!user) {
      return toast.warning("Please login first");
    }

    if (!isValid) {
      return toast.warning(
        "Please provide a star rating, designation and a review of at least 10 characters",
      );
    }

    try {
      setLoading(true);

      const result = await reviewService.createReview({
        quote: formData.quote.trim(),
        designation: formData.designation.trim(),
        rating: formData.rating,
      });

      if (result.success) {
        toast.success("Thank you! Your review has been submitted");
        setFormData(initialForm);
      } else {
        toast.error(result.message || "Failed to submit review");
      }
    } catch (error) {
      toast.error("Failed to submit review");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialForm);
    setHoveredRating(0);
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      {/* Page header */}
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">
          Share Your Experience
        </h2>
        <p className="text-sm text-muted-foreground">
          Your feedback helps other customers make better choices
        </p>
      </div>

      <Card className="overflow-hidden rounded-2xl border-border/60 shadow-lg">
        {/* Gradient header */}
        <div className="relative bg-linear-to-r from-green-600 to-emerald-500 px-6 py-5 text-white">
          <Quote className="absolute right-5 top-5 size-16 opacity-15" />
          <p className="text-sm font-medium uppercase tracking-wider text-green-50/80">
            MediStore
          </p>
          <h3 className="text-lg font-semibold">Write a Review</h3>
        </div>

        <CardContent className="space-y-6 p-6">
          {/* Posting as preview */}
          <div className="flex items-center gap-3 rounded-xl border bg-muted/40 p-4">
            <Avatar className="size-12 rounded-full ring-2 ring-background">
              <AvatarFallback className="bg-green-100 font-semibold text-green-700">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <p className="truncate font-semibold">
                {user?.name || "Guest User"}
              </p>
              <p className="flex items-center gap-1 text-sm text-muted-foreground">
                <BadgeCheck className="size-4 text-green-600" />
                Posting publicly as a verified customer
              </p>
            </div>
          </div>

          {/* Star rating */}
          <div className="space-y-2">
            <Label>Overall rating *</Label>

            <div className="flex items-center gap-3">
              <div
                className="flex items-center gap-1"
                onMouseLeave={() => setHoveredRating(0)}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    onMouseEnter={() => setHoveredRating(star)}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, rating: star }))
                    }
                    className="rounded-md p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50"
                  >
                    <Star
                      className={`size-8 transition-colors ${
                        star <= activeRating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-muted text-muted-foreground/30"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <span
                className={`text-sm font-medium ${
                  activeRating ? "text-foreground" : "text-muted-foreground/60"
                }`}
              >
                {RATING_LABELS[activeRating] || "Click to rate"}
              </span>
            </div>
          </div>

          {/* Designation */}
          <div className="space-y-2">
            <Label htmlFor="designation">Designation *</Label>
            <Input
              id="designation"
              placeholder="e.g., Verified Customer, Regular Customer, Pharmacist"
              value={formData.designation}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  designation: e.target.value,
                }))
              }
            />
          </div>

          {/* Review */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="quote">Your review *</Label>
              <span
                className={`text-xs tabular-nums ${
                  formData.quote.length > MAX_CHARS
                    ? "text-destructive"
                    : "text-muted-foreground"
                }`}
              >
                {formData.quote.length}/{MAX_CHARS}
              </span>
            </div>

            <Textarea
              id="quote"
              rows={5}
              maxLength={MAX_CHARS}
              placeholder="Tell us about your experience with our products and service..."
              value={formData.quote}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, quote: e.target.value }))
              }
              className="resize-none"
            />

            {formData.quote.length > 0 &&
              formData.quote.trim().length < MIN_CHARS && (
                <p className="text-xs text-muted-foreground">
                  {MIN_CHARS - formData.quote.trim().length} more characters
                  needed
                </p>
              )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleReset}
              disabled={loading}
              className="flex-1"
            >
              <RotateCcw />
              Clear
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={loading || !isValid}
              className="flex-2 bg-green-600 font-semibold hover:bg-green-700"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
