import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";
import NavItems from "./NavItems";

const Header = () => {
  return (
    <header className="w-full border-b">
      <Link href="/" className="w-36">
        <Image
          src="/assets/images/Logo.svg"
          width={128}
          height={38}
          alt="FireTheBox Logo"
        />
      </Link>{" "}
    </header>
  );
};

export default Header;
