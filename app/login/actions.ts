"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export default async function loginAction(formData: FormData) {
  try {
    // On connecte l'utilisateur sans rediriger ici
    await signIn("credentials", formData);
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw error;
  }
}