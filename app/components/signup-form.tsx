import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { signUp } from "~/services/authService";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "~/components/ui/field";
import { Input } from "~/components/ui/input";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await signUp(mail, password);

    if (error) {
      console.error("Fehler beim Registrieren", error.message);
      alert(error.message);
    } else {
      console.log("Registrierung erfolgreich", data);
      alert("Check deine E-Mail für die Bestätigung!");
      navigate("/app");
    }

    setMail("");
    setPassword("");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold text-gray-300">
              Welcome to{" "}
              <Link to={"/"}>
                {" "}
                <span className="text-oranje">Mach!</span>
              </Link>
            </h1>
            <FieldDescription className="text-gray-400">
              You already have an account? <a href="/login">Login</a>
            </FieldDescription>
          </div>
          <Field>
            <FieldLabel htmlFor="email" className="text-gray-300">
              Email
            </FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className="border-1 border-gray-300/20"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="password" className="text-gray-300">
              Password
            </FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="password"
              required
              className="border-1 border-gray-300/20"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
          <Field>
            <Button
              type="submit"
              className="bg-oranje cursor-pointer hover:bg-oranje/90"
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Field>
          <FieldSeparator>Or</FieldSeparator>

          <Button
            variant="outline"
            type="button"
            className="cursor-pointer bg-gray-200 hover:bg-gray-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Continue with Google
          </Button>
        </FieldGroup>
      </form>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
