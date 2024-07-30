"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { performSignUp } from "@/lib/auth/actions/performSignup";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import { useState } from "react";

const signUpFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8).max(32),
    confirmPassword: z.string(),
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
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    const email = values.email;
    const password = values.password;

    setIsLoading(true);

    try {
      await performSignUp(email, password);

      router.push("/sign-in");
      toast({
        title: "Yay! Conta criada com sucesso.",
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-exists") {
          toast({
            title: "Ops! Falha ao cadastrar a conta...",
            description: "Este e-mail já está em uso.",
            variant: "destructive",
          });
          return;
        }
      }

      toast({
        title: "Ops! Falha ao cadastrar a conta...",
        description: `Tente novamente mais tarde.`,
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
