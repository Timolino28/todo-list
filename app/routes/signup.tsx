import { SignupForm } from "~/components/signup-form";
import { Button } from "~/components/ui/button";

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="bg-neutral-700/30 rounded-xl p-10 max-w-sm border-[0.5px] border-gray-300/20">
        <SignupForm />
      </div>
    </div>
  );
}
