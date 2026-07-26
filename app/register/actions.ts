"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export default async function registerAction(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return { error: "Email already in use." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  try {
    // On connecte l'utilisateur sans rediriger ici
    await signIn("credentials", formData);
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created, but auto-login failed. Please login manually." };
    }
    throw error;
  }
}