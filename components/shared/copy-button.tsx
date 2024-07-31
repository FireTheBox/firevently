"use client";

import { handleError } from "@/lib/utils";
import { LucideCopy } from "lucide-react";
import { useState } from "react";
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
    <div className="font-bold text-secondary-foreground flex items-center gap-2 cursor-pointer">
      <Button
        asChild
        size={"icon"}
        variant={"ghost"}
        onClick={handleCopy}
        className="size-6"
      >
        <LucideCopy />
      </Button>
      {copied ? "Copiado!" : code}
    </div>
  );
}
