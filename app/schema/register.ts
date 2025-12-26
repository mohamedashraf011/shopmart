import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters").max(15,"Name must be at most 15 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().nonempty("Password is required").min(6, "Password must be at least 6 characters"),
    rePassword: z.string().nonempty("Confirm password is required").min(6, "Password must be at least 6 characters"),
    phone: z.string().nonempty("Phone number is required").regex(/^01[0125][0-9]{8}$/,"Invalid phone number"),
}).refine((object) => object.password === object.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
})
