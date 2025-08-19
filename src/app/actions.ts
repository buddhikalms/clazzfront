"use server";

import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkUserTeacherAccount() {
  const session = await auth();
  if (!session) {
    return { hasTeacherAccount: false, error: "Unauthorized" };
  }

  try {
    const user = await prisma.user.findFirst({
      where: { id: session.user.id },
      select: { teacherId: true },
    });

    if (user.teacherId) {
      return { hasTeacherAccount: true };
    }
    return { hasTeacherAccount: false };
  } catch (error) {
    console.error("Error checking teacher account:", error);
    return {
      hasTeacherAccount: false,
      error: "Failed to check teacher account",
    };
  } finally {
    await prisma.$disconnect();
  }
}
