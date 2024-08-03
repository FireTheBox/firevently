"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LoadingButton } from "@/components/shared/loading-button";
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
import { handleError } from "@/lib/utils";

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

export function SignInForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const email = values.email;
    const password = values.password;

    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/sign-in", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        toast({
          title: "Ops! Não foi possível autenticar seu usuário...",
          description: "Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Yay! Usuário autenticado com sucesso.",
        description: "Seja bem vindo novamente!",
      });

      router.back();
      router.refresh();
    } catch (error: any) {
      toast({
        title: "Ops! Não foi possível autenticar seu usuário...",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Digite seu e-mail"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton isLoading={isLoading}>Entrar</LoadingButton>
      </form>
    </Form>
  );
}
