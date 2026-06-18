import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, ShieldCheck } from "lucide-react";
import { userService } from "@/services/user.service";

export const Profile = async () => {
  const { data } = await userService.getSession();
  const user = data?.user;

  return (
    <Card className="border border-border/60 shadow-sm">
      <CardContent className="pt-6 pb-6 px-6">
        {/* Header row */}
        <div className="flex items-center gap-4 mb-5">
          <Avatar className="h-14 w-14 ring-2 ring-emerald-500/30 ring-offset-2 ring-offset-card">
            <AvatarFallback className="bg-emerald-500/10 text-emerald-500 text-xl font-semibold">
              {user.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-lg leading-tight truncate">
              {user.name}
            </p>
            <Badge
              variant="outline"
              className="mt-1 text-xs border-emerald-500/40 text-emerald-600 bg-emerald-500/5 capitalize"
            >
              <ShieldCheck className="w-3 h-3 mr-1" />
              {user.role}
            </Badge>
          </div>
        </div>

        <Separator className="mb-4" />

        {/* Contact details */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm">
            <div className="p-1.5 rounded-md bg-muted">
              <Mail className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="font-medium leading-tight">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="p-1.5 rounded-md bg-muted">
              <Phone className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="font-medium leading-tight">{user.phone}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
