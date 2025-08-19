import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import path from "path";
import fs from "fs/promises";
import crypto from "crypto";

// --- helper outside the component ---
async function saveFile(file) {
  const ext = path.extname(file.name);
  const fileName = `${crypto.randomUUID()}${ext}`;
  const savePath = path.join(process.cwd(), "public", "teachers", fileName);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(savePath, buffer);
  return `/teachers/${fileName}`;
}

export default async function EditTeacher() {
  const session = await auth();
  if (!session || !session.user?.id) redirect("/login");

  const teacher = await prisma.teacher.findUnique({
    where: { userId: session.user.id },
  });
  if (!teacher) return <p>No teacher profile found for your account.</p>;

  // --- server action inside the component ---
  async function updateTeacher(data) {
    "use server";

    const name = data.get("name");
    const subject = data.get("subject");
    const experience = data.get("experience");
    const rating = parseFloat(data.get("rating"));
    const bio = data.get("bio");

    let coverImagePath = teacher.coverImage;
    const coverFile = data.get("coverImage");
    if (coverFile && coverFile.size > 0) {
      coverImagePath = await saveFile(coverFile);
    }

    let profileImagePath = teacher.profileImage;
    const profileFile = data.get("profileImage");
    if (profileFile && profileFile.size > 0) {
      profileImagePath = await saveFile(profileFile);
    }

    await prisma.teacher.update({
      where: { id: teacher.id },
      data: {
        name,
        subject,
        experience,
        rating,
        bio,
        coverImage: coverImagePath,
        profileImage: profileImagePath,
        updatedAt: new Date(),
      },
    });

    redirect(`/teacher/${teacher.id}`);
  }

  return (
    <form action={updateTeacher} className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Teacher Details</h1>

      <label className="block mb-2">
        Name
        <input
          type="text"
          name="name"
          defaultValue={teacher.name}
          required
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-2">
        Subject
        <input
          type="text"
          name="subject"
          defaultValue={teacher.subject}
          required
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-2">
        Experience
        <input
          type="text"
          name="experience"
          defaultValue={teacher.experience}
          required
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-2">
        Rating
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          name="rating"
          defaultValue={teacher.rating}
          required
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-2">
        Bio
        <textarea
          name="bio"
          defaultValue={teacher.bio ?? ""}
          className="w-full border rounded px-3 py-2"
        />
      </label>

      <label className="block mb-2">
        Cover Image
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          className="w-full border rounded px-3 py-2"
        />
        {teacher.coverImage && (
          <img
            src={teacher.coverImage}
            alt="Current Cover"
            className="mt-2 h-24 rounded"
          />
        )}
      </label>

      <label className="block mb-2">
        Profile Image
        <input
          type="file"
          name="profileImage"
          accept="image/*"
          className="w-full border rounded px-3 py-2"
        />
        {teacher.profileImage && (
          <img
            src={teacher.profileImage}
            alt="Current Profile"
            className="mt-2 h-24 rounded"
          />
        )}
      </label>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Teacher
      </button>
    </form>
  );
}
