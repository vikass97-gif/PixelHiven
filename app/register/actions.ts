"use server";

import bcrypt from "bcryptjs";
import registerAction from "./actions";
import { signIn } from "@/auth";

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

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });
}