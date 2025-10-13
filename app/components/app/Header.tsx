import { useNavigate } from "react-router";
import { signOut } from "~/services/authService";
import { type WeekDay } from "~/utils/getWeekdays";

import { Button } from "../ui/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type HeaderProps = {
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onResetWeek: () => void;
  weeks: WeekDay[];
};

function Header({ onPrevWeek, onNextWeek, onResetWeek, weeks }: HeaderProps) {
  const today = new Date();

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
  const currentYear = weeks[0]?.date.getFullYear();

  return (
    <div className="flex justify-between items-center md:p-10 p-5">
      <div className="md:text-4xl text-2xl font-bold text-gray-300">
        {currentMonth} {currentYear}
      </div>
      <div className="flex items-center md:gap-10 gap-5">
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
          <Button
            className="cursor-pointer bg-red-400 hover:bg-red-400 border-1 border-red-500/20 hover:border-red-100/50 h-8 w-20 md:h-10 md:px-4 md:w-auto"
            onClick={handelSignOut}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
