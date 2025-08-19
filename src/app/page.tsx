import { auth } from "@/lib/auth";
import React from "react";

const page = async () => {
  const session = await auth();
  return (
    <div>
      {session?.user?.email}
      <h1>Hello</h1>
    </div>
  );
};

export default page;
