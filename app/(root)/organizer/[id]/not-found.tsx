import Link from "next/link";

import { H1 } from "@/components/typography/h1";
import { Lead } from "@/components/typography/lead";
import { P } from "@/components/typography/p";
import { Button } from "@/components/ui/button";

export default function OrganizerNotFound() {
    return (
      <div className="container my-20 flex flex-col items-center justify-center gap-4 bg-background">
        <Lead className="text-9xl">404</Lead>
        <H1 className="text-center">Oops! Organizador não encontrado.</H1>
        <P className="text-center">O organizador que você procura não existe.</P>
        <Button>
          <Link href="/" prefetch={false}>
            Voltar para o início
          </Link>
        </Button>
      </div>
    );
  }