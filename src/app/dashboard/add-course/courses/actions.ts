"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { z } from "zod";

const courseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  duration: z.string().min(1, "Duration is required"),
  level: z.string().min(1, "Level is required"),
  description: z.string().min(1, "Description is required"),
  ageLimit: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  enrollmentStatus: z.enum(["OPEN", "CLOSED"]).default("OPEN"),
  image: z.string().url("Valid image URL is required"),
});

export async function createCourse(formData: FormData) {
  try {
    // Get authenticated user
    const session = await auth();
    if (!session?.user?.email) {
      return { message: "Unauthorized: Please log in", success: false };
    }

    // Find teacher by user email
    const teacher = await prisma.teacher.findFirst({
      where: {
        user: { email: session.user.email },
      },
    });

    if (!teacher) {
      return {
        message: "No teacher profile found for this user",
        success: false,
      };
    }

    const data = {
      title: formData.get("title") as string,
      duration: formData.get("duration") as string,
      level: formData.get("level") as string,
      description: formData.get("description") as string,
      ageLimit: formData.get("ageLimit") as string | undefined,
      price: parseFloat(formData.get("price") as string),
      enrollmentStatus: formData.get("enrollmentStatus") as "OPEN" | "CLOSED",
      image: formData.get("image") as string,
    };

    // Validate input
    const validatedData = courseSchema.parse(data);

    // Create course
    await prisma.course.create({
      data: {
        ...validatedData,
        teacherId: teacher.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    revalidatePath("/courses");
    revalidatePath(`/teachers/${teacher.id}`);
    return { message: "Course created successfully", success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        message: "Validation failed",
        success: false,
        errors: error.errors.map((e) => `${e.path}: ${e.message}`),
      };
    }
    return { message: "Error creating course", success: false };
  }
}

export async function updateCourse(id: string, formData: FormData) {
  try {
    // Get authenticated user
    const session = await auth();
    if (!session?.user?.email) {
      return { message: "Unauthorized: Please log in", success: false };
    }

    // Verify teacher owns the course
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        teacher: {
          include: {
            user: { select: { email: true } },
          },
        },
      },
    });

    if (!course || course.teacher.user.email !== session.user.email) {
      return {
        message: "Unauthorized: You can only edit your own courses",
        success: false,
      };
    }

    const data = {
      title: formData.get("title") as string,
      duration: formData.get("duration") as string,
      level: formData.get("level") as string,
      description: formData.get("description") as string,
      ageLimit: formData.get("ageLimit") as string | undefined,
      price: parseFloat(formData.get("price") as string),
      enrollmentStatus: formData.get("enrollmentStatus") as "OPEN" | "CLOSED",
      image: formData.get("image") as string,
    };

    // Validate input
    const validatedData = courseSchema.parse(data);

    await prisma.course.update({
      where: { id },
      data: {
        ...validatedData,
        updatedAt: new Date(),
      },
    });

    revalidatePath("/courses");
    revalidatePath(`/teachers/${course.teacherId}`);
    return { message: "Course updated successfully", success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        message: "Validation failed",
        success: false,
        errors: error.errors.map((e) => `${e.path}: ${e.message}`),
      };
    }
    return { message: "Error updating course", success: false };
  }
}

export async function deleteCourse(id: string) {
  try {
    // Get authenticated user
    const session = await auth();
    if (!session?.user?.email) {
      return { message: "Unauthorized: Please log in", success: false };
    }

    // Verify teacher owns the course
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        teacher: {
          include: {
            user: { select: { email: true } },
          },
        },
      },
    });

    if (!course || course.teacher.user.email !== session.user.email) {
      return {
        message: "Unauthorized: You can only delete your own courses",
        success: false,
      };
    }

    await prisma.course.delete({
      where: { id },
    });

    revalidatePath("/courses");
    revalidatePath(`/teachers/${course.teacherId}`);
    return { message: "Course deleted successfully", success: true };
  } catch (error) {
    return { message: "Error deleting course", success: false };
  }
}

export async function getCourses() {
  try {
    // Get authenticated user
    const session = await auth();
    if (!session?.user?.email) {
      return [];
    }

    // Find teacher by user email
    const teacher = await prisma.teacher.findFirst({
      where: {
        user: { email: session.user.email },
      },
    });

    if (!teacher) {
      return [];
    }

    return await prisma.course.findMany({
      where: { teacherId: teacher.id },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    return [];
  }
}
