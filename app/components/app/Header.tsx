import { useNavigate } from "react-router";
import { signOut } from "~/services/authService";
import { type WeekDay } from "~/utils/getWeekdays";

import { Button } from "../ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { PiGearFill } from "react-icons/pi";
import { RxAvatar } from "react-icons/rx";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type HeaderProps = {
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onResetWeek: () => void;
  weeks: WeekDay[];
  weekOffset: number;
};

function Header({
  onPrevWeek,
  onNextWeek,
  onResetWeek,
  weeks,
  weekOffset,
}: HeaderProps) {
  const navigate = useNavigate();

  const handelSignOut = async () => {
    const { error } = await signOut();

    if (error) {
      console.error("Logout fehlgeschlagen", error.message);
    } else {
      console.log("Logout erfolgreich");
      navigate("/");
    }
  };

  const currentMonth = weeks[0]?.date.toLocaleString("de-DE", {
    month: "long",
  });
  const currentMonthShort = weeks[0]?.date.toLocaleString("de-DE", {
    month: "short",
  });
  const currentYear = weeks[0]?.date.getFullYear();

  return (
    <div className="flex justify-between items-center md:p-10 p-5">
      <div className="md:block hidden text-4xl font-bold text-gray-300">
        {currentMonth} {currentYear}
      </div>
      <div className="md:hidden block text-2xl font-bold text-gray-300">
        {currentMonthShort} {currentYear}
      </div>
      <div className="flex items-center md:gap-10 gap-3">
        <div
          className={`transition-opacity duration-200 ${weekOffset !== 0 ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
          <Button
            className="cursor-pointer bg-oranje hover:bg-oranje border-1 border-oranje/20 hover:border-orange-300/50 h-8 w-18 md:h-10 md:px-4 md:w-auto rounded-full"
            onClick={onResetWeek}
          >
            Zurück
          </Button>
        </div>

        <div className="flex md:gap-3 gap-2">
          <Button
            onClick={onPrevWeek}
            className="md:w-10 w-8 md:h-10 h-8 flex items-center justify-center bg-neutral-700 hover:bg-neutral-700 cursor-pointer rounded-full border-1 border-gray-300/20 hover:border-gray-300/50"
          >
            <FaChevronLeft className="text-gray-300" />
          </Button>
          <Button
            onClick={onNextWeek}
            className="md:w-10 w-8 md:h-10 h-8 flex items-center justify-center bg-neutral-700 hover:bg-neutral-700 cursor-pointer rounded-full border-1 border-gray-300/20 hover:border-gray-300/50"
          >
            <FaChevronRight className="text-gray-300" />
          </Button>
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="md:w-10 w-8 md:h-10 h-8 flex items-center justify-center bg-gray-300 hover:bg-gray-300 cursor-pointer rounded-full border-1 border-neutral-200/20 hover:border-gray-300/80">
                <RxAvatar className="text-neutral-700 text-2xl" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-300">
              <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer bg-gray-300 focus:bg-gray-300">
                  <PiGearFill />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handelSignOut}
                  className="cursor-pointer bg-gray-300 focus:bg-gray-300"
                >
                  <FiLogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

export default Header;
