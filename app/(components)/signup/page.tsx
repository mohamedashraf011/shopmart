"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { registerSchema } from "@/app/schema/register";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function SignUp() {
  const router = useRouter();

  const form = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function handleRegister(values: RegisterFormData) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "https://ecommerce.routemisr.com"}/api/v1/auth/signup`,
        values
      );

      if (response.data.message === "success") {
        toast.success("Registration completed successfully", {
          position: "top-center",
          duration: 2000,
        });
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "There is an error", {
        position: "top-center",
        duration: 2000,
      });
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center">

      <h1 className="text-3xl font-bold text-center mt-12 mb-8 shrink-0">
        Register now and Join US
      </h1>

      <div className="w-full max-w-md p-5 rounded-2xl shadow-2xl bg-white shrink-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegister)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-8">
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
                <FormItem className="mb-8">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem className="mb-8">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Phone" {...field} />
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
