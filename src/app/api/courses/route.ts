import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        teacher: {
          select: {
            id: true,
            slug: true,
            name: true,
            profileImage: true,
            subject: true,
            rating: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: courses });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error fetching courses" },
      { status: 500 }
    );
  }
}
