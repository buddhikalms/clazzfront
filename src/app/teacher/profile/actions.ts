"use server";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  const categoriesRaw = formData.get("categories") as string;

  const content = formData.get("content");

  const categories = categoriesRaw
    .split(",")
    .map((cat) => cat.trim())
    .filter((cat) => cat !== "");

  console.log(title, content, categories);
  // Update data
  // Revalidate cache
}
