"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LoadingButton } from "@/components/shared/loading-button";
import { PasswordStrengthMeter } from "@/components/shared/password-strength-meter";
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

const signUpFormSchema = z
  .object({
    email: z
      .string({
        required_error: "O campo e-mail é obrigatório.",
      })
      .email({
        message: "E-mail inválido.",
      }),
    password: z
      .string({
        required_error: "O campo senha é obrigatório.",
      })
      .min(8, {
        message: "A senha deve ter pelo menos 8 caracteres",
      })
      .max(32, {
        message: "A senha deve ter no máximo 32 caracteres",
      }),
    confirmPassword: z.string({
      required_error: "O campo confirmar senha é obrigatório.",
    }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "As senhas não coincidem.",
    }
  );

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
  });

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    const email = values.email;
    const password = values.password;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/sign-up", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        toast({
          title: "Ops! Falha ao cadastrar a conta...",
          description: "Tente novamente mais tarde.",
          variant: "destructive",
        });
        return;
      }

      const body = await response.json();

      if (!body) {
        toast({
          title: "Ops! Falha ao cadastrar a conta...",
          description: "Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      router.push("/sign-in");
      toast({
        title: "Yay! Conta criada com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Ops! Falha ao cadastrar a conta...",
        description: `Tente novamente mais tarde.`,
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
              {field.value && <PasswordStrengthMeter password={field.value} />}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirme sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton isLoading={isLoading}>Cadastrar</LoadingButton>
      </form>
    </Form>
  );
}
