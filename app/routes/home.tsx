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
      <div className="text-gray-300">
        Hallo, Du Ferkel
        <div>
          <Button className="bg-oranje">Click Me</Button>
        </div>
      </div>
      {/* Erstmal noch NavBar bauen -> die machen wir handmade */}
      {/* Hier kommt die Landingpage hin - übe das ein bisschen hinsichtlich Design etc. */}
    </>
  );
}
