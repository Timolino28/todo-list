import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Mach!" },
    { name: "description", content: "Your todo-list to get shit done!" },
  ];
}

export default function Home() {
  return (
    <>
      {/* Erstmal noch NavBar bauen -> die machen wir handmade */}
      {/* Hier kommt die Landingpage hin - übe das ein bisschen hinsichtlich Design etc. */}
      Hallo, Du Ferkel
    </>
  );
}
