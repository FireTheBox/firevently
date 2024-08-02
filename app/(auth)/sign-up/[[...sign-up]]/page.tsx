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
import { signIn } from "@/lib/auth";
import { SignUpForm } from "./sign-up-form";

export default function Page() {
  return (
    <>
      <Card className="max-w-screen-md mx-auto my-32">
        <CardHeader className="items-center">
          <CardTitle className="mb-5">Cadastrar</CardTitle>
          <CardDescription>Cadastre com suas redes sociais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-10">
          <div className="flex flex-col items-center md:flex-row md:justify-center gap-5">
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

          <SignUpForm />
        </CardContent>
        <CardFooter>
          <Muted className="mx-auto">
            Já possui conta?{" "}
            <Link
              href={"/sign-in"}
              className="text-secondary-foreground underline"
            >
              Entrar
            </Link>
          </Muted>
        </CardFooter>
      </Card>
    </>
  );
}
