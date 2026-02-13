import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      authorization: {
        params: {
          prompt: "consent", // Forces account selection and consent
        },
      },
    }),
    Google({
      authorization: {
        params: {
          access_type: "offline",
          prompt: "consent", // Forces account selection and consent
        },
      },
    }),
  ],
  pages: {
    signIn: "/",
    error: "/error",
  },
});
