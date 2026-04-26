"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import z from "zod";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Minimum length is 8. "),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const handleGoogleLogin = async () => {
    const data = authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000",
    });
    router.push("/");
  };
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
      console.log("Submit button clicked..!");

      const toastId = toast.loading("Logging in user.");

      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("User logged in successfully.", { id: toastId });
        router.push("/");
      } catch (error) {
        toast.error("Something went wrong, please try aging later ..", {
          id: toastId,
        });
      }
    },
  });

  const session = authClient.useSession();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card {...props}>
        <CardHeader className="text-center uppercase">
          <CardTitle>Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        type="email"
                        name={field.name}
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter Your Email"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <form.Field name="password">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        type="password"
                        name={field.name}
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Enter Your Password"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" form="login-form" type="submit">
            Login
          </Button>
          <Button
            onClick={() => handleGoogleLogin()}
            variant="outline"
            type="button"
            className="w-full"
          >
            Login with Google
          </Button>
          <FieldDescription className="text-center">
            Don&apos;t have an account? Please
            <Link className="font-semibold text-black pl-1" href="/register">
              Register
            </Link>
          </FieldDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
