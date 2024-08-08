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
import { Textarea } from "@/components/ui/textarea";
import { eventFormSchema } from "@/lib/event/event.definition";
import { useUploadThing } from "@/lib/uploadthing";
import { handleError } from "@/lib/utils";

import { useToast } from "../ui/use-toast";
import { CategoryDropdown } from "./category/category-dropdown";
import { DatePicker } from "./date-picker";
import { FileUploader } from "./file-uploader";
import { LoadingButton } from "./loading-button";

type EventFormProps = {
  operation: "Atualizar" | "Criar";
  id?: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  categoryName?: string;
  startDate?: Date;
  endDate?: Date;
  reward?: number;
  registrationLink?: string;
  registrationFee?: number;
  communityInvitation?: string;
  isFeatured?: boolean;
  organizerName?: string;
};

export const EventForm = ({
  operation,
  id,
  thumbnail,
  title,
  description,
  categoryName,
  startDate,
  endDate,
  reward,
  registrationLink,
  registrationFee,
  communityInvitation,
  isFeatured,
  organizerName,
}: EventFormProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      thumbnail: thumbnail || "",
      title: title || "",
      description: description || "",
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
      reward: reward || 0,
      registrationLink: registrationLink || "",
      registrationFee: registrationFee || 0,
      communityInvitation: communityInvitation || "",
      isFeatured: isFeatured || false,
      category: categoryName,
      organizer: organizerName,
    },
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    setIsLoading(true);
    let uploadedImageUrl = values.thumbnail;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        setIsLoading(false);
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    try {
      const request = {
        thumbnail: uploadedImageUrl,
        title: values.title,
        description: values.description,
        reward: values.reward,
        startDate: values.startDate,
        endDate: values.endDate,
        registrationLink: values.registrationLink,
        registrationFee: values.registrationFee,
        communityInvitation: values.communityInvitation,
        isFeatured: values.isFeatured,
        categoryId: values.category,
        organizerName: values.organizer,
      };

      const response = await fetch("/api/event", {
        method: operation === "Atualizar" ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          operation === "Atualizar" ? { ...request, id } : request
        ),
      });

      const { event: eventId } = await response.json();

      if (!eventId) {
        toast({
          title: `Falha ao ${operation.toLowerCase()} o evento.`,
          variant: "destructive",
        });
        return;
      }

      form.reset();
      router.push(`/admin/events/update/${eventId}`);
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
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Título do evento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <CategoryDropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea placeholder="Descrição" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
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
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="organizer"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Nome do organizador:</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Data de Início:</FormLabel>
                <FormControl>
                  <DatePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Data de Término:</FormLabel>
                <FormControl>
                  <DatePicker value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col justify-center gap-5 md:flex-row md:items-start">
          <FormField
            control={form.control}
            name="registrationLink"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Link de inscrição:</FormLabel>
                <FormControl>
                  <Input type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="registrationFee"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Taxa de inscrição:</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col justify-center gap-5 md:flex-row md:items-start">
          <FormField
            control={form.control}
            name="communityInvitation"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Link de convite para comunidade:</FormLabel>
                <FormControl>
                  <Input type="url" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reward"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Premiação</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <LoadingButton
          isLoading={isLoading}
        >{`${operation} evento`}</LoadingButton>
      </form>
    </Form>
  );
};
