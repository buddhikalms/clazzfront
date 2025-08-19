import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-secure-jwt-secret";

export async function middleware(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    const session = await prisma.session.findUnique({
      where: { sessionToken: token },
    });
    if (!session || session.expires < new Date()) {
      return NextResponse.json(
        { error: "Session expired or invalid" },
        { status: 401 }
      );
    }

    req.nextUrl.searchParams.set("userId", decoded.userId);
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid token" + error },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/protected/:path*", "/api/follow"],
};
