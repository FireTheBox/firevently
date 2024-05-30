import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"
import MobileNav from "./MobileNav"
import NavItems from "./NavItems"

const Header = () => {
  return (
  <header className="w-full border-b">
    <div className="wrapper flex items-center justify-between">
      <Link href="/" className="w-36">
        <Image 
          src="/assets/images/Logo.svg" width={128} height={38}
          alt="FireTheBox Logo"  
        />
      </Link>

      <SignedIn>
        <nav className="md:flex-between hidden w-full max-w-xs">
          <NavItems/>
          {/**
           * md:flex-between: Esta classe não é padrão do Tailwind CSS. Pode ser uma classe customizada definida no seu projeto. 
            No entanto, com base na convenção de nomes, pode indicar que, em tamanhos de tela médios (md), 
            o layout dos itens flexíveis é distribuído com espaço entre eles (justify-between).
           * hidden: Oculta o elemento nav. Geralmente usado para esconder o elemento em telas menores e exibi-lo em telas maiores usando classes responsivas.
           * w-full: Define a largura do elemento para ocupar 100% da largura disponível.
           * max-w-xs: Define a largura máxima do elemento como xs (geralmente 20rem ou 320px), evitando que o elemento se expanda além desse tamanho.
           */}
        </nav>
      </SignedIn>
      
      <div className="flex w-32 justify-end gap-3">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
           <MobileNav/>
        </SignedIn>
        <SignedOut>
          <Button asChild className="rounded-full" size="lg">
            <Link href="/sign-in">
                Login
            </Link> 
          </Button>
        </SignedOut>
      </div>      
    </div>
  </header>
  )
}

export default Header

