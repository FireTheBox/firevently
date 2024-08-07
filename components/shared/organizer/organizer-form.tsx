"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { organizerFormSchema } from "@/lib/organizer/organizer.definition";
import { useUploadThing } from "@/lib/uploadthing";
import { handleError } from "@/lib/utils";

import { FileUploader } from "../file-uploader";
import { LoadingButton } from "../loading-button";

interface OrganizerFormProps {
  operation: "Atualizar" | "Registrar";
  id?: string;
  name?: string;
  logo?: string;
  contact?: string;
}

export const OrganizerForm = ({
  operation,
  id,
  name,
  logo,
  contact,
}: OrganizerFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof organizerFormSchema>>({
    resolver: zodResolver(organizerFormSchema),
    defaultValues: {
      name: name,
      logo: logo,
      contact: contact,
    },
  });

  async function onSubmit(values: z.infer<typeof organizerFormSchema>) {
    setIsLoading(true);
    let uploadedLogoUrl = values.logo;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        setIsLoading(false);
        return;
      }

      uploadedLogoUrl = uploadedImages[0].url;
    }

    try {
      const request = {
        name: values.name,
        logo: uploadedLogoUrl,
        contact: values.contact,
      };

      const response = await fetch("/api/organizer", {
        method: operation === "Atualizar" ? "PUT" : "POST",
        body: JSON.stringify(
          operation === "Atualizar" ? { ...request, id } : request
        ),
      });

      const { organizer: organizerId } = await response.json();

      if (!organizerId) {
        toast({
          title: `Falha ao ${operation.toLowerCase()} o organizador.`,
          variant: "destructive",
        });
        return;
      }

      form.reset();
      router.push(`/organizer/${organizerId}`);
      router.refresh();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Nome do organizador" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl className="h-40">
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value}
                  setFiles={setFiles}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Link de contato:</FormLabel>
              <FormControl>
                <Input type="url" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton isLoading={isLoading}>
          {`${operation} organizador`}
        </LoadingButton>
      </form>
    </Form>
  );
};
