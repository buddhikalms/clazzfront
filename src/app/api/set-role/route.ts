import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { role, userId } = await req.json();

    if (!userId || !["Student", "Teacher"].includes(role)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (role === "Teacher") {
      const teacher = await prisma.teacher.create({
        data: {
          slug:
            user.email?.split("@")[0] +
            "-" +
            Math.random().toString(36).slice(2),
          name: user.name || "Unnamed Teacher",
          subject: "",
          experience: "",
          rating: 0.0,
          coverImage: "",
          profileImage: "",
          bio: "",
          qualifications: {},
          subjects: {},
        },
      });

      await prisma.user.update({
        where: { id: userId },
        data: { teacherId: teacher.id },
      });
    } else {
      const student = await prisma.student.create({
        data: { createdAt: new Date(), updatedAt: new Date() },
      });

      await prisma.user.update({
        where: { id: userId },
        data: { studentId: student.id },
      });
    }

    return NextResponse.json({ message: "Role set" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to set role" }, { status: 500 });
  }
}
