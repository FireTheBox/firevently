import Link from "next/link";
import { Icon, IconName } from "../helper/icon";

interface SocialMedia {
  icon: IconName;
  url: string;
}

const socialLinks: SocialMedia[] = [
  { icon: "twitter", url: "FireTheBox" },
  { icon: "github", url: "FireTheBox" },
  { icon: "facebook", url: "FireTheBox" },
  { icon: "instagram", url: "https://www.instagram.com/firethebox/" },
  { icon: "linkedin", url: "https://www.linkedin.com/company/firethebox/?originalSubdomain=br" },
];

export const SocialMedias = () => (
  <div className="flex gap-4 mb-4">
    {socialLinks.map((link, index) => (
      <Link key={index} href={link.url}>
        <Icon name={link.icon} size={20} />
      </Link>
    ))}
  </div>
);
