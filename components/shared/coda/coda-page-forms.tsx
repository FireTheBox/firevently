"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { codaPageTypes } from "@/constants";
import {
  codaPageFormSchema,
  ICodaPageWithId,
} from "@/lib/coda/coda-page.definition";
import { handleError } from "@/lib/utils";

import { LoadingButton } from "../loading-button";
import { columns } from "./table/columns";
import { DataTable } from "./table/data-table";

type CodaPageFormProps = {
  eventId: string | undefined;
};

export const CodaPageForm = ({ eventId }: CodaPageFormProps) => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);

  const [codaPages, setCodaPages] = useState<ICodaPageWithId[]>([]);

  useEffect(() => {
    if (!eventId) {
      setCodaPages([]);
      return;
    }

    fetch(`/api/coda/events/${eventId}`)
      .then((response) => response.json())
      .then((result) =>
        setCodaPages(result.codaPages satisfies ICodaPageWithId[])
      )
      .catch((error) => {
        setCodaPages([]);
        handleError(error);
      });
  }, []);

  const form = useForm<z.infer<typeof codaPageFormSchema>>({
    resolver: zodResolver(codaPageFormSchema),
    defaultValues: {
      type: "Detalhes",
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof codaPageFormSchema>) {
    setIsLoading(true);

    try {
      const response = await fetch("/api/coda", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: values.type,
          url: values.url,
          tableId: values.tableId,
          event: eventId,
        }),
      });

      const { codaPage } = await response.json();

      if (!codaPage) {
        toast({
          title: `Falha ao registrar a página do Coda.`,
          variant: "destructive",
        });
        return;
      }

      fetch(`/api/coda/events/${eventId}`)
        .then((response) => response.json())
        .then((result) =>
          setCodaPages(result.codaPages satisfies ICodaPageWithId[])
        )
        .catch((error) => {
          setCodaPages([]);
          handleError(error);
        });

      form.reset();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo da página:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full md:w-[300px]">
                      <SelectValue placeholder="Selecione o tipo da página..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {codaPageTypes.map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="capitalize"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col justify-end gap-3 md:flex-row md:items-end">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Link completo da página:</FormLabel>
                  <FormControl>
                    <Input type="url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tableId"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>ID da tabela:</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <LoadingButton
              isLoading={isLoading}
              className="w-full md:w-[300px]"
            >
              Registrar página do Coda
            </LoadingButton>
          </div>
        </form>
      </Form>

      <DataTable columns={columns} data={codaPages} />
    </div>
  );
};
