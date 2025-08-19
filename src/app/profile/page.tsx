import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { teacher: true, student: true },
  });

  const role = user?.teacherId
    ? "Teacher"
    : user?.studentId
    ? "Student"
    : "Unknown";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome, {session.user.name}</h1>
        <p>Email: {session.user.email}</p>
        <p>Role: {role}</p>
        {role === "Teacher" && user?.teacher && (
          <div>
            <p>Subject: {user.teacher.subject}</p>
            <p>Experience: {user.teacher.experience}</p>
          </div>
        )}
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md">
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
