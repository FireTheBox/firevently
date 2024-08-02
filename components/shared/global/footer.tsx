import Image from "next/image";

import { P } from "@/components/typography/p";
import Logo from "@/public/assets/images/platform-dark-logo.png";
import Link from "next/link";
import { SocialMedias } from "./social-medias";

import { Muted } from "@/components/typography/muted";
import Nguzu from "@/public/assets/images/nguzu.svg";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-foreground py-6">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        <div className="w-full flex justify-around items-center">
          <Link
            href={
              "https://www.linkedin.com/pulse/nguzu-project-como-criamos-e-concretizamos-tiago-cardoso/"
            }
            className="space-y-2"
          >
            <Muted>Powered By</Muted>
            <Image src={Nguzu} alt={"Nguzu"} width={180} height={60} />
          </Link>
          <Link href={"https://firethebox.com/about"}>
            <Image
              src={Logo}
              alt="Logo"
              width={180}
              height={60}
              className="object-contain"
            />
          </Link>
        </div>
        <P className="text-center">
          Uma startup, spin-off do fundo de impacto Nguzu, que busca
          democratizar o empreendedorismo e inovação, através de ambientes
          propícios para potencializar ideias, projetos e pessoas.
        </P>
        <P className="text-center text-muted-foreground">
          © firethebox.com. Todos os direitos reservados.
        </P>
        <div className="flex justify-center">
          <SocialMedias />
        </div>
      </div>
    </footer>
  );
};
