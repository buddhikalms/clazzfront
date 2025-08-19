import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { slug: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const { slug } = params;

    const course = await prisma.course.findUnique({
      where: { slug },
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
        lessons: true,
      },
    });

    if (!course) {
      return NextResponse.json(
        { success: false, message: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: course });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Error fetching course by slug" },
      { status: 500 }
    );
  }
}
