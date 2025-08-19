// src/components/CourseForm.tsx
"use client";

import { useState } from "react";
import { createCourse, updateCourse } from "./courses/actions";
import { Course } from "@prisma/client";

interface CourseFormProps {
  teacherId: string;
  mode: "create" | "update";
  course?: Course;
}

interface FormResponse {
  success: boolean;
  message: string;
  errors?: string[];
}

export default function CourseForm({
  teacherId,
  mode,
  course,
}: CourseFormProps) {
  const [response, setResponse] = useState<FormResponse | null>(null);

  async function handleSubmit(formData: FormData) {
    const result =
      mode === "create"
        ? await createCourse(formData)
        : await updateCourse(course!.id, formData);

    setResponse(result);
  }

  return (
    <div className="max-w-lg mx-auto">
      <form action={handleSubmit} className="space-y-4">
        <input type="hidden" name="teacherId" value={teacherId} />

        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={course?.title}
            required
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Course Title"
          />
        </div>

        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-gray-700"
          >
            Duration
          </label>
          <input
            type="text"
            name="duration"
            id="duration"
            defaultValue={course?.duration}
            required
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 4 weeks"
          />
        </div>

        <div>
          <label
            htmlFor="level"
            className="block text-sm font-medium text-gray-700"
          >
            Level
          </label>
          <input
            type="text"
            name="level"
            id="level"
            defaultValue={course?.level}
            required
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Beginner"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            defaultValue={course?.description}
            required
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Course description"
          />
        </div>

        <div>
          <label
            htmlFor="ageLimit"
            className="block text-sm font-medium text-gray-700"
          >
            Age Limit (Optional)
          </label>
          <input
            type="text"
            name="ageLimit"
            id="ageLimit"
            defaultValue={course?.ageLimit}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., 18+"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            defaultValue={course?.price}
            required
            step="0.01"
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Course price"
          />
        </div>

        <div>
          <label
            htmlFor="enrollmentStatus"
            className="block text-sm font-medium text-gray-700"
          >
            Enrollment Status
          </label>
          <select
            name="enrollmentStatus"
            id="enrollmentStatus"
            defaultValue={course?.enrollmentStatus || "OPEN"}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="OPEN">Open</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL
          </label>
          <input
            type="url"
            name="image"
            id="image"
            defaultValue={course?.image}
            required
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/course-image.jpg"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {mode === "create" ? "Create Course" : "Update Course"}
        </button>
      </form>

      {response && (
        <div
          className={`mt-4 p-4 rounded-md ${
            response.success ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <p className={response.success ? "text-green-700" : "text-red-700"}>
            {response.message}
          </p>
          {response.errors && (
            <ul className="list-disc pl-5 mt-2 text-sm text-red-700">
              {response.errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
