"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Send,
  Store,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import { roleChangeRequestService } from "@/services/role-change-request.service";
import { RoleChangeRequest } from "@/types";

const ROLE_LABELS: Record<string, string> = {
  SELLER: "Seller",
  ADMIN: "Admin",
};

const MAX_CHARS = 300;

export const RoleRequestForm = ({
  targetRole,
}: {
  targetRole: "SELLER" | "ADMIN";
}) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<RoleChangeRequest[]>([]);
  const [isLoadingRequests, setIsLoadingRequests] = useState(true);

  const latestRequest = requests[0];
  const hasPendingRequest = latestRequest?.status === "PENDING";

  const fetchMyRequests = useCallback(async () => {
    try {
      setIsLoadingRequests(true);
      const result = await roleChangeRequestService.getMyRequests();
      setRequests(result?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingRequests(false);
    }
  }, []);

  useEffect(() => {
    fetchMyRequests();
  }, [fetchMyRequests]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const result = await roleChangeRequestService.createRequest({
        requestedRole: targetRole,
        reason: reason.trim() || undefined,
      });

      if (result.success) {
        toast.success(
          "Your role change request has been submitted. Please wait for the admin's decision",
        );
        setReason("");
        await fetchMyRequests();
      } else {
        toast.error(result.message || "Failed to submit request");
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit role change request",
      );
    } finally {
      setLoading(false);
    }
  };

  const isSellerRequest = targetRole === "SELLER";
  const HeaderIcon = isSellerRequest ? Store : ShieldCheck;

  return (
    <div className="mx-auto w-full max-w-2xl space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">
          {isSellerRequest ? "Become a Seller" : "Request Admin Access"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isSellerRequest
            ? "Submit a request to upgrade your account from Customer to Seller. An admin will review it."
            : "Submit a request to upgrade your account from Seller to Admin. An admin will review it."}
        </p>
      </div>

      <Card className="overflow-hidden rounded-2xl border-border/60 shadow-lg">
        <div className="relative bg-linear-to-r from-green-600 to-emerald-500 px-6 py-5 text-white">
          <HeaderIcon className="absolute right-5 top-5 size-14 opacity-15" />
          <p className="text-sm font-medium uppercase tracking-wider text-green-50/80">
            MediStore
          </p>
          <h3 className="text-lg font-semibold">
            {isSellerRequest
              ? "Seller Role Request"
              : "Admin Role Request"}
          </h3>
        </div>

        <CardContent className="space-y-6 p-6">
          {/* Latest request status */}
          {isLoadingRequests ? (
            <div className="flex items-center gap-2 rounded-xl border bg-muted/40 p-4 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Loading your request status...
            </div>
          ) : latestRequest ? (
            <div className="space-y-2 rounded-xl border bg-muted/40 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium">
                  Latest request: {latestRequest.currentRole} &rarr;{" "}
                  {ROLE_LABELS[latestRequest.requestedRole] ??
                    latestRequest.requestedRole}
                </p>

                {latestRequest.status === "PENDING" ? (
                  <Badge
                    variant="outline"
                    className="border-amber-500/40 bg-amber-500/5 text-amber-600"
                  >
                    <Clock className="mr-1" />
                    Pending
                  </Badge>
                ) : latestRequest.status === "APPROVED" ? (
                  <Badge variant="success">
                    <CheckCircle2 className="mr-1" />
                    Approved
                  </Badge>
                ) : (
                  <Badge variant="destructive-outline">
                    <XCircle className="mr-1" />
                    Rejected
                  </Badge>
                )}
              </div>

              {latestRequest.reason ? (
                <p className="text-sm text-muted-foreground">
                  Reason: {latestRequest.reason}
                </p>
              ) : null}

              <p className="text-xs text-muted-foreground">
                Submitted on{" "}
                {new Intl.DateTimeFormat("en-US", {
                  dateStyle: "medium",
                }).format(new Date(latestRequest.createdAt))}
              </p>
            </div>
          ) : null}

          {hasPendingRequest ? (
            <p className="rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 text-sm text-amber-700">
              You already have a pending request. The admin will review it and
              you will be notified once a decision is made.
            </p>
          ) : (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Reason (optional)
                  </p>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {reason.length}/{MAX_CHARS}
                  </span>
                </div>

                <Textarea
                  rows={4}
                  maxLength={MAX_CHARS}
                  placeholder={
                    isSellerRequest
                      ? "Tell us why you want to become a seller (e.g., pharmacy or store details)..."
                      : "Tell us why you need admin access..."
                  }
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-green-600 font-semibold hover:bg-green-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send />
                    Request {ROLE_LABELS[targetRole]} Role
                  </>
                )}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
