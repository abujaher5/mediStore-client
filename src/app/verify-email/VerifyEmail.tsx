"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2, MailCheck } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

type Status = "verifying" | "success" | "failed" | "idle";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token = searchParams.get("token");
  const emailParam = searchParams.get("email") ?? "";

  const [email, setEmail] = useState(emailParam);
  const [status, setStatus] = useState<Status>(token ? "verifying" : "idle");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!token) return;

    const verify = async () => {
      const { error } = await authClient.verifyEmail({
        query: { token },
      });

      if (error) {
        setStatus("failed");
        return;
      }

      setStatus("success");
      toast.success("Your email has been verified");
      setTimeout(() => router.push("/"), 2500);
    };

    verify();
  }, [token, router]);

  const handleResend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setResending(true);
    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL: "/",
    });
    setResending(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Verification email sent. Please check your inbox.");
  };

  if (status === "verifying") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 size={40} className="animate-spin text-green-500" />
        <p className="text-gray-600 font-medium">
          Verifying your email address...
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <CheckCircle2 size={52} className="text-green-500" strokeWidth={1.2} />
        <h1 className="text-xl font-bold text-gray-800">Email Verified!</h1>
        <p className="text-sm text-gray-400">
          Your account is now active. Redirecting you...
        </p>
        <Link
          href="/login"
          className="text-sm bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 transition"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6">
      {status === "failed" ? (
        <XCircle size={52} className="text-red-400" strokeWidth={1.2} />
      ) : (
        <MailCheck size={52} className="text-green-500" strokeWidth={1.2} />
      )}

      <h1 className="text-xl font-bold text-gray-800">
        {status === "failed"
          ? "Verification link is invalid or expired"
          : "Check your email"}
      </h1>
      <p className="text-sm text-gray-400 text-center max-w-sm">
        {status === "failed"
          ? "The link may have expired or already been used. Request a new verification email below."
          : "We've sent a verification link to your email address. Click it to activate your account."}
      </p>

      <form
        onSubmit={handleResend}
        className="w-full max-w-sm flex flex-col gap-3 mt-2"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition"
        />
        <button
          type="submit"
          disabled={resending}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl py-3 transition flex items-center justify-center gap-2"
        >
          {resending ? (
            <>
              <Loader2 size={15} className="animate-spin" /> Sending...
            </>
          ) : (
            "Resend verification email"
          )}
        </button>
      </form>
    </div>
  );
}
