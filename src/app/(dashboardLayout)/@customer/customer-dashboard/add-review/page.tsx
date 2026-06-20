"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/get-logged-user";
import { User } from "lucide-react";
import { reviewService } from "@/services/review.service";

export default function AddReview() {
  const { user } = useCurrentUser();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    quote: "",
    designation: "",
  });

  const handleSubmit = async () => {
    if (!user) {
      return toast.warning("Please login first");
    }

    if (!formData.quote || !formData.designation) {
      return toast.warning("All fields are required");
    }

    try {
      setLoading(true);

      const result = await reviewService.createReview({
        quote: formData.quote,
        designation: formData.designation,
      });

      if (result.success) {
        toast.success("Review submitted successfully");
        setFormData({
          quote: "",
          designation: "",
          //   image: user.image || User,
        });
      } else {
        toast.error("Failed to submit review");
      }
    } catch (error) {
      toast.error("Failed to submit review");
      console.log(error);
    }

    toast.success("Review submitted successfully");

    setFormData({
      quote: "",
      designation: "",
    });
  };

  return (
    <Card className="max-w-2xl mx-auto rounded-2xl shadow-lg">
      <CardContent className="p-6 space-y-5">
        <h2 className="text-2xl font-bold">Share Your Experience</h2>

        {/* Logged User Preview */}
        <div className="border rounded-lg p-3 ">
          <p className="font-medium">{user?.name}</p>
        </div>

        {/* Designation */}
        <Input
          placeholder="Designation (e.g., Verified Customer, Regular Customer, etc.)"
          value={formData.designation}
          onChange={(e) =>
            setFormData({
              ...formData,
              designation: e.target.value,
            })
          }
        />

        {/* Review */}
        <Textarea
          rows={5}
          placeholder="Write your review."
          value={formData.quote}
          onChange={(e) =>
            setFormData({
              ...formData,
              quote: e.target.value,
            })
          }
        />

        <Button
          onClick={handleSubmit}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Submit Review
        </Button>
      </CardContent>
    </Card>
  );
}
