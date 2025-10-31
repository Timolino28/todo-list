import { Button } from "./ui/button";
import { Link } from "react-router";

function navbar() {
  return (
    <div className="flex flex-col gap-5 justify-center items-center h-screen">
      <Link to={"/"}>
        <div className="text-8xl text-oranje font-bold">Mach!</div>
      </Link>

      <div>
        <Link to={"/login"}>
          <Button className="text-2xl cursor-pointer px-16 py-6 bg-neutral-700 hover:bg-neutral-700 border-1 border-gray-300/20 hover:border-gray-300/50">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default navbar;
