"use client";

import { useDropzone } from "@uploadthing/react/hooks";
import { Dispatch, SetStateAction, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import { H3 } from "../typography/h3";
import Image from "next/image";
import { LucideUpload } from "lucide-react";
import { P } from "../typography/p";

type FileUploaderProps = {
  onFieldChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".gif", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex justify-center items-center h-72 cursor-pointer flex-col overflow-hidden rounded-xl bg-primary"
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <Image
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            className="w-full object-cover object-center"
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-5 text-primary-foreground gap-2">
          <LucideUpload size={24} />
          <H3>Arraste a foto aqui</H3>
          <P>PNG, GIF, JPEG, JPG, SVG</P>
          <Button variant={"secondary"}>Selecionar do computador</Button>
        </div>
      )}
    </div>
  );
}
