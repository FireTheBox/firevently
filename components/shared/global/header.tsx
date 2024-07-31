"use client";

import { links } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toogle";

import Logo from "@/public/assets/images/platform-dark-logo.png";
import { Small } from "@/components/typography/small";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { signOut } from "@/lib/auth";
import { performSignOut } from "@/lib/auth/actions/performSignout";

export const Header = () => {
  const { data } = useSession();

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

        {data?.user?.email ? (
          <Button className="w-24" onClick={async () => performSignOut()}>
            Sair
          </Button>
        ) : (
          <Button className="w-24" asChild>
            <Link href={"/sign-in"}>Entrar</Link>
          </Button>
        )}
      </div>
    </header>
  );
};
