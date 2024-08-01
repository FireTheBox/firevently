import Image from "next/image";

import { P } from "@/components/typography/p";
import Logo from "@/public/assets/images/platform-dark-logo.png";
import { SocialMedias } from "./social-medias";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-foreground py-6">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        <div className="w-32 h-10">
          <Image src={Logo} alt="Logo" width={128} height={40} />
        </div>
        <P className="text-center">
          Your Company é uma empresa dedicada a fornecer soluções inovadoras e
          eficientes para ajudar nossos clientes a alcançar seus objetivos de
          negócios. Com uma equipe experiente e comprometida, estamos sempre
          prontos para oferecer suporte e orientação.
        </P>
        <P className="text-center text-muted-foreground">© 2024 Your Company. All rights reserved.</P>
        <div className="flex space-x-4">
          <SocialMedias />
        </div>
      </div>
    </footer>
  );
};
