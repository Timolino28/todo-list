import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useAuth } from "~/context/AuthContext";
import { deleteUserAccount } from "~/services/authService";
import { useNavigate } from "react-router";

type DeleteDialogProps = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

export function DeleteDialog({ open, onOpenChange }: DeleteDialogProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!user) return;

    try {
      await deleteUserAccount(user.id);
      alert("Dein Account wurde gelöscht.");
      navigate("/");
    } catch (error) {
      alert("Fehler beim Löschen des Accounts.");
      console.error("Fehler beim Löschen des Accounts", error);
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-gray-300">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer bg-transparent hover:bg-transparent border-1 border-gray-400 hover:border-gray-200">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="cursor-pointer bg-red-500 hover:bg-red-600 border-1 border-red-700"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteDialog;
