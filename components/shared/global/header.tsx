import { links } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toogle";

import { Small } from "@/components/typography/small";
import { auth } from "@/lib/auth";
import Logo from "@/public/assets/images/platform-dark-logo.png";
import { AuthButton } from "../auth-button";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="container flex justify-between py-8">
      <Link href="/" className="w-36">
        <Image src={Logo} width={148} height={48} alt="FireTheBox Logo" />
      </Link>
      <div className="flex items-center gap-8">
        <nav className="flex gap-8">
          {links.map(({ label, route }, index) => (
            <Link key={index} href={route}>
              <Small>{label}</Small>
            </Link>
          ))}
        </nav>
        <ModeToggle />

        <AuthButton session={session} />
      </div>
    </header>
  );
};
