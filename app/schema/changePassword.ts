import { z } from "zod";

export const changePasswordSchema = z.object({
    currentPassword: z.string().nonempty("Current password is required").min(6, "Password must be at least 6 characters"),
    password: z.string().nonempty("New password is required").min(6, "Password must be at least 6 characters"),
    rePassword: z.string().nonempty("Confirm password is required"),
}).refine((data) => data.password === data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"],
});