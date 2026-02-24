"use client";

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
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
  });

  // 1. Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // mode: "onChange", // This enables real-time validation as the user types
    defaultValues: {
      username: "",
      email: "",
    },
  });

  // 2. Define a submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    // This will be type-safe and validated
    console.log("Form values:", values);
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-50 rounded-lg shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Field: Username */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Mario 123" {...field} />
                </FormControl>
                <div className="h-3">
                  <FormMessage className="text-xs" />
                </div>
                {/* Zod errors */}
              </FormItem>
            )}
          />

          {/* Field: Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="tu@email.com"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <div className="h-3">
                  <FormMessage className="text-xs" />
                </div>
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
