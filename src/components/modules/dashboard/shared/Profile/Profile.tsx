import Link from "next/link";
import {
  BadgeCheck,
  CalendarDays,
  IdCard,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  Store,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { userService } from "@/services/user.service";

const DASHBOARD_PATH_MAP: Record<string, string> = {
  CUSTOMER: "/customer-dashboard",
  SELLER: "/seller-dashboard",
  ADMIN: "/admin-dashboard",
};

export const Profile = async () => {
  const { data } = await userService.getSession();
  const user = data?.user;

  const memberSince = user?.createdAt
    ? new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
        new Date(user.createdAt),
      )
    : null;

  const details = [
    {
      icon: Mail,
      label: "Email",
      value: user?.email,
    },
    {
      icon: Phone,
      label: "Phone",
      value: user?.phone,
    },
    {
      icon: ShieldCheck,
      label: "Role",
      value: user?.role,
      capitalize: true,
    },
    {
      icon: IdCard,
      label: "User ID",
      value: user?.id,
      mono: true,
    },
    {
      icon: CalendarDays,
      label: "Member Since",
      value: memberSince,
    },
  ];

  const dashboardPath = DASHBOARD_PATH_MAP[user?.role] ?? "/customer-dashboard";

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-sm text-muted-foreground">
          Your personal account information
        </p>
      </div>

      <Card className="overflow-hidden border-border/60 shadow-sm">
        <div className="relative h-28 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600">
          <div className="absolute -top-10 -right-8 size-32 rounded-full bg-white/10" />
          <div className="absolute top-6 right-20 size-14 rounded-full bg-white/10" />
          <div className="absolute -bottom-10 -left-6 size-24 rounded-full bg-white/10" />
        </div>

        <CardContent className="space-y-6 px-6 pb-6">
          <div className="-mt-12 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <Avatar className="size-24 border-4 border-card shadow-md">
                {user?.image ? <AvatarImage src={user.image} /> : null}
                <AvatarFallback className="bg-emerald-500/10 text-3xl font-semibold text-emerald-600">
                  {user?.name?.charAt(0) ?? "?"}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1.5 pb-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-xl font-semibold leading-tight">
                    {user?.name}
                  </p>
                  {user?.emailVerified ? (
                    <BadgeCheck className="size-5 shrink-0 text-emerald-500" />
                  ) : null}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className="border-emerald-500/40 bg-emerald-500/5 text-emerald-600 capitalize"
                  >
                    <Store className="mr-1" />
                    {user?.role ?? "Seller"}
                  </Badge>
                  {user?.status ? (
                    <Badge
                      variant={
                        user.status.toUpperCase() === "ACTIVE"
                          ? "success"
                          : "secondary"
                      }
                      className="capitalize"
                    >
                      {user.status}
                    </Badge>
                  ) : null}
                </div>
              </div>
            </div>

            <Button asChild className="mb-1">
              <Link href={`${dashboardPath}/manage-profile`}>
                <Pencil />
                Edit Profile
              </Link>
            </Button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {details.map(({ icon: Icon, label, value, capitalize, mono }) => (
              <div
                key={label}
                className="flex items-center gap-3 rounded-lg border border-border/60 bg-muted/40 p-3"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-600">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{label}</p>
                  {value ? (
                    <p
                      className={`truncate text-sm font-medium ${
                        capitalize ? "capitalize" : ""
                      } ${mono ? "font-mono text-xs" : ""}`}
                    >
                      {value}
                    </p>
                  ) : (
                    <p className="text-sm font-normal text-muted-foreground">
                      Not provided
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
