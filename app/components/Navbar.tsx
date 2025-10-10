import { Button } from "./ui/button";
import { Link } from "react-router";

function navbar() {
  const links = [
    { name: "Pricing", link: "/pricing" },
    { name: "FAQ", link: "/faq" },
    { name: "Reviews", link: "/reviews" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full flex justify-between items-center p-5 border-b-[0.5px] border-gray-300/20">
      <Link to={"/"}>
        <div className="text-xl text-oranje font-bold">Mach!</div>
      </Link>

      <div>
        <ul className="flex gap-10">
          {links.map((link) => (
            <li
              key={link.name}
              className=" text-gray-300 text-[14px] md:text-[16px]"
            >
              <a
                href={link.link}
                className="hover:border-b-1 hover:border-gray-300"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <Link to={"/login"}>
          <Button className="cursor-pointer bg-neutral-700 hover:bg-neutral-700 border-1 border-gray-300/20 hover:border-gray-300/50">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default navbar;
