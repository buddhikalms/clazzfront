"use client";

import { signIn } from "next-auth/react";
import React from "react";

const Signin = () => {
  return <button onClick={() => signIn("google")}>Sign in</button>;
};

export default Signin;
