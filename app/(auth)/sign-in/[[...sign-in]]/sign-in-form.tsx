"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { performLogin } from "@/lib/auth/actions/performLogin";
import { handleError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const email = values.email;
    const password = values.password;

    setIsLoading(true);
    try {
      const success = await performLogin(email, password);

      if (!success) {
        toast({
          title: "Ops! Não foi possível autenticar seu usuário...",
          description: "Tente novamente mais tarde.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Yay! Usuário autenticado com sucesso.",
        description: "Seja bem vindo novamente!",
      });

      router.back();
    } catch (error: any) {
      handleError(error);
      toast({
        title: "Ops! Não foi possível autenticar seu usuário...",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
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
