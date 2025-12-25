import { auth, signOut } from "@/auth";
import LoginButton from "./components/LoginButton";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        Chiao-Fan&apos;s Identity and Access Management Showcase
      </h1>
      <div>
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4">
            {error === "OAuthCallbackError"
              ? "There was a problem linking your account. Please check your credentials."
              : "An unexpected error occurred."}
          </div>
        )}
      </div>
      {session ? (
        <div className="text-center max-w-2xl mx-auto">
          {/* Added max-w-2xl and mx-auto for better readability */}
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            Authentication Successful!
          </h2>
          <p className="mb-6 text-lg">
            Welcome back,
            <span className="font-bold text-blue-700">
              {session.user?.name}
            </span>
            !
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            This showcase demonstrates a robust **Next.js 15 App Router**
            integration with **Auth.js v5 (NextAuth)** for secure Identity and
            Access Management. Leveraging **Server Components** and **Server
            Actions**, it provides a streamlined, full-stack authentication flow
            via **GitHub OAuth**, ensuring secure user sessions and data access.
          </p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors">
              Sign Out
            </button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-4 w-full max-w-xs">
          <LoginButton provider="github" />
          <LoginButton provider="google" />
        </div>
      )}
    </main>
  );
}
