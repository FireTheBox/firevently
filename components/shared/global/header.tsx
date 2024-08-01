import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "./mode-toogle";

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
import { LucideMenu } from "lucide-react";
import { AuthButton } from "../auth-button";

export const Header = async () => {
  const session = await auth();

  return (
    <header className="container flex justify-between py-8">
      <Link href="/" className="w-36">
        <Image src={Logo} width={148} height={48} alt="FireTheBox Logo" />
      </Link>
      <div className="flex items-center gap-8">
        <nav className="hidden md:flex gap-8">
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
            <DropdownMenuContent className="w-fit mr-4">
              {links.map(({ label, route }, index) => (
                <DropdownMenuItem key={index}>
                  <Link href={route} className="w-full text-center">
                    {label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel asChild className="my-5 mx-3">
                <AuthButton session={session} />
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
