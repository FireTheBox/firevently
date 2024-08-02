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
import { SignInForm } from "./sign-in-form";

export default function Page() {
  return (
    <>
      <Card className="max-w-screen-md mx-auto my-32">
        <CardHeader className="items-center">
          <CardTitle className="mb-5">Entrar</CardTitle>
          <CardDescription>Entre com suas redes sociais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-10">
          <div className="flex flex-col items-center sm:flex-row sm:justify-center gap-5">
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

          <div className="flex gap-1 md:gap-4 items-center">
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
