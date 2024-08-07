import Link from "next/link";

import { AuthMethodSeparator } from "@/auth/auth-method-separator";
import { ProviderSignInForm } from "@/auth/provider-sign-in-form";
import { SignUpForm } from "@/auth/sign-up-form";
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
          <CardTitle className="mb-5">Cadastrar</CardTitle>
          <CardDescription>Cadastre com suas redes sociais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-10">
          <ProviderSignInForm />
          <AuthMethodSeparator />
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
