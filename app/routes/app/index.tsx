import { useNavigate } from "react-router";
import { signOut } from "~/services/authService";

import { Button } from "~/components/ui/button";

function app() {
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

  return (
    <>
      <div className="text-3xl text-gray-300">App</div>
      <Button className="cursor-pointer" onClick={handelSignOut}>
        Sign Out
      </Button>
    </>
  );
}

export default app;
