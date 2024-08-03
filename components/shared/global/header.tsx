import { LucideMenu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Small } from "@/components/typography/small";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { links } from "@/constants";
import { auth } from "@/lib/auth";
import Logo from "@/public/assets/images/platform-dark-logo.png";

import { AuthButton } from "../auth-button";
import { ModeToggle } from "./mode-toogle";

export async function Header() {
  const session = await auth();

  return (
    <header className="container flex justify-between py-8">
      <Link href="/" className="w-36">
        <Image src={Logo} width={148} height={48} alt="FireTheBox Logo" />
      </Link>
      <div className="flex items-center gap-8">
        <nav className="hidden gap-8 md:flex">
          {links.map(({ label, route }, index) => (
            <Link key={index} href={route}>
              <Small>{label}</Small>
            </Link>
          ))}
        </nav>

        <ModeToggle />

        <AuthButton session={session} className="hidden md:block" />

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <LucideMenu size={32} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-4 w-fit">
              {links.map(({ label, route }, index) => (
                <DropdownMenuItem key={index}>
                  <Link href={route} className="w-full text-center">
                    {label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel asChild className="mx-3 my-5">
                <AuthButton session={session} />
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
