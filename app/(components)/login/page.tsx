"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { loginSchema } from "@/app/schema/login";
import { z } from "zod";

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();

  const form = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function handleLogin(values: LoginFormData) {
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (res?.error) {
      let errorMessage = "Login failed";
      
      if (res.error === "CredentialsSignin") {
        errorMessage = "Invalid email or password";
      } else {
        errorMessage = res.error;
      }
      
      toast.error(errorMessage, {
        position: "top-center",
        duration: 2000,
      });
      return;
    }

    toast.success("Login done successfully", {
      position: "top-center",
      duration: 2000,
    });

    router.push("/");
  }

  return (
  <div className="min-h-screen flex flex-col items-center justify-center">
    <h1 className="text-3xl font-bold text-center mb-8">
      Welcome Back!
    </h1>

    <div className="w-full max-w-md p-5 rounded-2xl shadow-2xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  </div>
  );
}
