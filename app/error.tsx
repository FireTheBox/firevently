"use client";

import { H1 } from "@/components/typography/h1";
import { Lead } from "@/components/typography/lead";
import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ reset }: ErrorProps) {
  return (
    <div className="container flex my-20 max-w-screen-lg flex-col items-center justify-center gap-5 bg-background text-center">
      <H1>Ops, algo deu errado!</H1>

      <Lead>
        Lamentamos, mas ocorreu um erro inesperado. Tente novamente mais tarde
        ou entre em contato com o suporte se o problema persistir.
      </Lead>

      <Button onClick={reset}>Tentar novamente</Button>
    </div>
  );
}
