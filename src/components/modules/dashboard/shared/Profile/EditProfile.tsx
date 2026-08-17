"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, User, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { userService } from "@/services/user.service";

interface EditProfileProps {
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

export const EditProfile = ({ user }: EditProfileProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[+]?[\d\s-]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const res = await userService?.updateProfile(formData);

      if (res?.success) {
        toast.success("Profile updated successfully");
        router.refresh();
      } else {
        toast.error(res?.message ?? "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border border-border/60 shadow-sm">
      <CardContent className="pt-6 pb-6 px-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-5">
          <Avatar className="h-14 w-14 ring-2 ring-emerald-500/30 ring-offset-2 ring-offset-card">
            <AvatarFallback className="bg-emerald-500/10 text-emerald-500 text-xl font-semibold">
              {formData.name.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-lg leading-tight">Edit Profile</p>
            <p className="text-xs text-muted-foreground">
              Update your account&apos;s essential information
            </p>
          </div>
        </div>

        <Separator className="mb-5" />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="name"
              className="text-xs text-muted-foreground flex items-center gap-1.5"
            >
              <User className="w-3.5 h-3.5" />
              Full Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter your full name"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-xs text-muted-foreground flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" />
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="you@example.com"
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <Label
              htmlFor="phone"
              className="text-xs text-muted-foreground flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+880 1XXXXXXXXX"
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone}</p>
            )}
          </div>

          <Separator className="my-2" />

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Save Changes
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
