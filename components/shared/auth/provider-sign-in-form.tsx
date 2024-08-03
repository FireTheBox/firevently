import { FaGoogle } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { signIn } from "@/lib/auth";

export function ProviderSignInForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirect: true, redirectTo: "/" });
      }}
      className="mx-auto w-fit"
    >
      <Button type="submit" variant={"outline"}>
        <FaGoogle className="mr-3 size-5" />
        Entrar com Google
      </Button>
    </form>
  );
}
