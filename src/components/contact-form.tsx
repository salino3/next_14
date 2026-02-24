"use client";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2, CheckCircle2 } from "lucide-react";

import { supabase } from "@/lib/supabase";
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
import RichEditor from "./rich-editor/rich-editor";
// import Image from "next/image";

// 1. Schema definition (moved outside to prevent re-renders)
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  // 2. Form Setup
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onTouched", // For input form
    defaultValues: {
      username: "",
      email: "",
    },
  });

  // 3. Mutation Setup (TanStack Query + Supabase)
  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const { data, error } = await supabase
        .from("profiles") // Ensure this matches your Supabase table name
        .insert([values])
        .select();

      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      form.reset();
    },
  });

  // 4. Submit Handler
  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-xl border shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold">User Registration</h2>
        <p className="text-sm text-muted-foreground">
          Submit your details to our database.
          {/* <Image /> */}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
        }}
        className="max-w-md mx-auto p-8"
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <>
                      {/* <RichEditor
                        content={field.value}
                        onChange={field.onChange}
                      /> */}
                      <Input
                        type="text"
                        placeholder="mario_dev"
                        autoFocus
                        autoComplete="off"
                        {...field}
                      />
                    </>
                  </FormControl>
                  <div className="h-4">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <>
                      {/* <RichEditor
                        content={field.value}
                        onChange={field.onChange}
                      /> */}
                      <Input
                        type="email"
                        placeholder="mario@example.com"
                        {...field}
                      />
                    </>
                  </FormControl>
                  <div className="h-4">
                    <FormMessage className="text-xs" />
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Submit details"
              )}
            </Button>

            {/* Success/Error Feedback */}
            {mutation.isSuccess && (
              <div className="flex items-center gap-2 text-green-600 text-sm mt-2 justify-center">
                <CheckCircle2 className="h-4 w-4" />
                <span>Data saved successfully!</span>
              </div>
            )}

            {mutation.isError && (
              <div className="text-destructive text-sm mt-2 text-center">
                Error: {mutation.error.message}
              </div>
            )}
          </form>
        </Form>
      </motion.div>
    </div>
  );
}
