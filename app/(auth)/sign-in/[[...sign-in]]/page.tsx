import Link from "next/link";

import { AuthMethodSeparator } from "@/auth/auth-method-separator";
import { ProviderSignInForm } from "@/auth/provider-sign-in-form";
import { SignInForm } from "@/auth/sign-in-form";
import { Muted } from "@/components/typography/muted";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Page() {
  return (
    <>
      <Card className="mx-auto my-32 max-w-screen-md">
        <CardHeader className="items-center">
          <CardTitle className="mb-5">Entrar</CardTitle>
          <CardDescription>Entre com suas redes sociais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-10">
          <ProviderSignInForm />
          <AuthMethodSeparator />
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
