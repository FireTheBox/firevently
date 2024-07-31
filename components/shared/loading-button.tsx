import { Loader2 } from "lucide-react";
import { HTMLAttributes, ReactNode } from "react";
import { Button } from "../ui/button";

interface LoadingButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading: boolean;
}

export const LoadingButton = ({
  children,
  isLoading,
  className,
  ...rest
}: LoadingButtonProps) => {
  return (
    <Button
      type="submit"
      className={`w-full ${className}`}
      disabled={isLoading}
      {...rest}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};
