// auth.ts (直接放在根目錄)
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub, Google],
  pages: {
    signIn: "/", // Or whenever your login buttons are located
    error: "/", // Redirect back to home on error to show a custom message
  },
});
