import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    // 1. Vérifier si l'utilisateur existe déjà dans MySQL
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "This email is already registered! Please Sign In instead." },
        { status: 400 }
      );
    }

    // 2. Crypter le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Créer le compte dans la base MySQL (TiDB Cloud)
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "Account created successfully", user: { id: user.id, email: user.email } },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER_ERROR:", error);
    return NextResponse.json(
      { message: "Database connection error. Please try again." },
      { status: 500 }
    );
  }
}