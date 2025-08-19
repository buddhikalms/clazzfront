import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Credentials": "true",
  "Access-Control-Max-Age": "86400",
};

// Handle OPTIONS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { email, phone, password, name, role, teacherDetails, googleToken } =
      await req.json();

    console.log("Register attempt:", { email, phone, role, googleToken });

    // Validation
    if (!email && !phone) {
      console.log("Missing email or phone");
      return NextResponse.json(
        { error: "Email or phone is required" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!googleToken && !password) {
      console.log("Missing password for non-Google registration");
      return NextResponse.json(
        { error: "Password is required for non-Google registration" },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!["STUDENT", "TEACHER"].includes(role)) {
      console.log("Invalid role:", role);
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Check for existing user
    const existingUser = email
      ? await prisma.user.findUnique({ where: { email } })
      : phone
      ? await prisma.user.findUnique({ where: { phone } })
      : null;

    if (existingUser) {
      console.log("User already exists:", email || phone);
      return NextResponse.json(
        { error: "User already exists with this email or phone" },
        { status: 400, headers: corsHeaders }
      );
    }

    // Create user
    const userId = uuidv4();
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const user = await prisma.user.create({
      data: {
        id: userId,
        email,
        phone,
        password: hashedPassword,
        name,
        role,
      },
    });

    // Handle teacher-specific data
    if (role === "TEACHER") {
      if (
        !teacherDetails ||
        !teacherDetails.subject ||
        !teacherDetails.experience
      ) {
        console.log("Incomplete teacher details:", teacherDetails);
        return NextResponse.json(
          { error: "Teacher subject and experience are required" },
          { status: 400, headers: corsHeaders }
        );
      }

      const teacherId = uuidv4();
      await prisma.teacher.create({
        data: {
          id: teacherId,
          slug: email
            ? email.split("@")[0] +
              "-" +
              Math.random().toString(36).substring(2, 8)
            : `teacher-${teacherId.slice(0, 8)}`,
          name: name || "Unnamed Teacher",
          subject: teacherDetails.subject,
          experience: teacherDetails.experience.toString(),
          coverImage:
            teacherDetails.coverImage || "https://via.placeholder.com/150",
          profileImage:
            teacherDetails.profileImage || "https://via.placeholder.com/50",
          bio: teacherDetails.bio || "",
          qualifications: teacherDetails.qualifications || {
            degree: teacherDetails.subject,
          },
          subjects: teacherDetails.subjects || [teacherDetails.subject],
          allowedCountries: teacherDetails.allowedCountries || [],
          restrictedCountries: teacherDetails.restrictedCountries || [],
          userId: user.id,
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { teacherId },
      });
    } else if (role === "STUDENT") {
      const studentId = uuidv4();
      await prisma.student.create({
        data: {
          id: studentId,
          userId: user.id,
        },
      });

      await prisma.user.update({
        where: { id: user.id },
        data: { studentId },
      });
    }

    console.log(`User created: ${user.id}`);
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
          name: user.name,
          role: user.role,
        },
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500, headers: corsHeaders }
    );
  } finally {
    await prisma.$disconnect();
  }
}
