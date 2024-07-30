import { Muted } from "@/components/typography/muted";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaDiscord, FaGoogle } from "react-icons/fa";

import { P } from "@/components/typography/p";

import { Separator } from "@/components/ui/separator";
import { SignInForm } from "./sign-in-form";
import { signIn } from "@/lib/auth";

export default function Page() {
  return (
    <>
      <Card className="max-w-screen-md mx-auto my-32">
        <CardHeader className="items-center">
          <CardTitle className="mb-5">Entrar</CardTitle>
          <CardDescription>Entre com suas redes sociais</CardDescription>
        </CardHeader>
        <CardContent className="px-32 space-y-10">
          <div className="flex justify-center gap-5">
            <form
              action={async () => {
                "use server";
                await signIn("discord");
              }}
              className="size-fit"
            >
              <Button type="submit" variant={"outline"}>
                <FaDiscord className="mr-3 size-5" />
                Entrar com Discord
              </Button>
            </form>
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
              className="size-fit"
            >
              <Button type="submit" variant={"outline"}>
                <FaGoogle className="mr-3 size-5" />
                Entrar com Google
              </Button>
            </form>
          </div>

          <div className="flex gap-4 items-center">
            <Separator className="flex-1" />
            <P>ou com e-mail</P>
            <Separator className="flex-1" />
          </div>

          <SignInForm />
        </CardContent>
        <CardFooter>
          <Muted className="mx-auto">
            Não possui conta?{" "}
            <Link
              href={"/sign-up"}
              className="text-secondary-foreground underline"
            >
              Cadastrar
            </Link>
          </Muted>
        </CardFooter>
      </Card>
    </>
  );
}
