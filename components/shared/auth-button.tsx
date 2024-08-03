"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { HTMLAttributes } from "react";

import { performSignOut } from "@/lib/auth/actions/performSignout";

import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";

interface AuthButtonProps extends HTMLAttributes<HTMLButtonElement> {
  session: Session | null;
}

export function AuthButton({ session, className, ...rest }: AuthButtonProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await performSignOut();
    router.push("/");
    router.refresh();

    toast({
      title: "Você saiu da sua conta.",
    });
  };

  return (
    <>
      {session?.user?.email ? (
        <Button
          className={`w-24 ${className}`}
          onClick={handleSignOut}
          {...rest}
        >
          Sair
        </Button>
      ) : (
        <Button className={`w-24 ${className}`} {...rest}>
          <Link href={"/sign-in"}>Entrar</Link>
        </Button>
      )}
    </>
  );
}
