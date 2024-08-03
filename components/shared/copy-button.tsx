"use client";

import { LucideCopy } from "lucide-react";
import { useState } from "react";

import { handleError } from "@/lib/utils";

import { P } from "../typography/p";
import { Button } from "../ui/button";

interface CopyButtonProps {
  value: string;
}

export function CopyButton({ value: code }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reseta o estado "copiado" após 2 segundos
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className="flex cursor-pointer items-center gap-2 text-secondary-foreground">
      <Button
        asChild
        size={"icon"}
        variant={"ghost"}
        onClick={handleCopy}
        className="size-6"
      >
        <LucideCopy />
      </Button>
      <P className="w-fit">{copied ? "Copiado!" : code}</P>
    </div>
  );
}
