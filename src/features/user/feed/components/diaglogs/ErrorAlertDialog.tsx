import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { FC } from "react";

interface ErrorAlertDialogProps {
  message: string;
}

export const ErrorAlertDialog: FC<ErrorAlertDialogProps> = ({ message }) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle className="text-center text-error">
          Alert!!!
        </AlertDialogTitle>
        <AlertDialogDescription asChild>
          <div>
            <p className="whitespace-pre-line">{message}</p>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogAction asChild>
          <Button>Understood</Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
