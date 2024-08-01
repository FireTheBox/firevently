"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { performSignOut } from "@/lib/auth/actions/performSignout";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { Session } from "next-auth";

interface AuthButtonProps {
  session: Session | null;
}

export function AuthButton({ session }: AuthButtonProps) {
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
        <Button className="w-24" onClick={handleSignOut}>
          Sair
        </Button>
      ) : (
        <Button className="w-24" asChild>
          <Link href={"/sign-in"}>Entrar</Link>
        </Button>
      )}
    </>
  );
}
