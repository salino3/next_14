"use client"; // ¡Importante! Los formularios necesitan interactividad

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function ContactForm() {
  // 1. Definir el formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  // 2. Definir qué pasa al enviar (submit)
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Datos enviados:", values);
    alert("Formulario enviado con éxito");
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-50 rounded-lg shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Campo: Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre de usuario</FormLabel>
                <FormControl>
                  <Input placeholder="flavio123" {...field} />
                </FormControl>
                <FormMessage /> {/* Aquí aparecen los errores de Zod */}
              </FormItem>
            )}
          />

          {/* Campo: Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="tu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </Form>
    </div>
  );
}
