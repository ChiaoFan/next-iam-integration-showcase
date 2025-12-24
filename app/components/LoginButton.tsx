"use client";

import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface LoginButtonProps {
  provider: "github" | "google";
}

export default function LoginButton({ provider }: LoginButtonProps) {
  const handleLogin = async () => {
    // 1. THE FIX: This clears the "?error=..." from the URL bar
    // so the user doesn't see an old error after logging in successfully.
    if (typeof window !== "undefined") {
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }

    // 2. Start the Auth.js sign-in process
    await signIn(provider);
  };

  const isGithub = provider === "github";

  return (
    <button
      onClick={handleLogin}
      className="w-full flex items-center justify-center gap-3 px-6 py-3 rounded-lg font-medium transition-all bg-black hover:bg-gray-800 text-white cursor-pointer"
    >
      {isGithub ? (
        <FaGithub className="text-xl" />
      ) : (
        <FaGoogle className="text-xl" />
      )}
      <span>Login with {isGithub ? "GitHub" : "Google"}</span>
    </button>
  );
}
