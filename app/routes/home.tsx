import type { Route } from "./+types/home";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mach!" },
    { name: "description", content: "Your todo-list to get shit done!" },
  ];
}

export default function Home() {
  return (
    <>
      {/* Hier kommt die Landingpage hin - übe das ein bisschen hinsichtlich Design etc. */}
    </>
  );
}
