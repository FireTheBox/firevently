import Image from "next/image";
import Link from "next/link";

import Logo from "@/public/assets/images/platform-dark-logo.png";
import { Muted } from "../typography/muted";
import { P } from "../typography/p";
import { SocialMedias } from "./social-medias";

const FooterColumn: React.FC<{
  title: string;
  links: { name: string; href: string }[];
}> = ({ title, links }) => (
  <div className="flex flex-col gap-2">
    <P className="text-center">{title}</P>
    <ul className="space-y-1 text-center">
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href}>
            <Muted>{link.name}</Muted>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer = () => {
  return (
    <footer className="container py-8 space-y-16">
      <div className="mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1 flex flex-col items-center lg:items-start max-w-lg">
          <div className="w-32 h-10 mb-4">
            <Image
              src={Logo}
              alt="Logo"
              width={128}
              height={40}
            />
          </div>
          <P>
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups.
          </P>
        </div>
        <div className="flex-1">
          <FooterColumn
            title="Sobre"
            links={[
              { name: "Lorem", href: "#" },
              { name: "Lorem", href: "#" },
              { name: "Lorem", href: "#" },
              { name: "Lorem", href: "#" },
            ]}
          />
        </div>
        <div className="flex-1">
          <FooterColumn
            title="Serviços"
            links={[
              { name: "Lorem", href: "#" },
              { name: "Lorem", href: "#" },
              { name: "Lorem", href: "#" },
              { name: "Lorem", href: "#" },
              { name: "Lorem", href: "#" },
              { name: "Lorem", href: "#" },
            ]}
          />
        </div>
        <div className="flex-1">
          <FooterColumn
            title="Contato"
            links={[
              { name: "Lorem", href: "#" },
              { name: "Lorem", href: "#" },
              { name: "Lorem", href: "#" },
              { name: "Lorem", href: "#" },
              { name: "Lorem", href: "#" },
            ]}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <P>© 2020 Open PRO. All rights reserved.</P>
        <SocialMedias />
      </div>
    </footer>
  );
};
