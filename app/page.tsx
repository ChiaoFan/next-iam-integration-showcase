import { auth, signOut } from "@/auth";
import LoginButton from "./components/LoginButton";
import JumpGame from "./components/JumpGame";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  const { error } = await searchParams;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center px-2">
        Chiao-Fan&apos;s Identity and Access Management Showcase
      </h1>
      <div>
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4 text-sm md:text-base">
            {error === "OAuthCallbackError"
              ? "There was a problem linking your account. Please check your credentials."
              : "An unexpected error occurred."}
          </div>
        )}
      </div>
      {session ? (
        <div className="text-center w-full max-w-2xl mx-auto px-2">
          <div className="space-y-6">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm md:text-base">
                Welcome, {session.user?.name}! You are login sucessfully. You
                can play now.{" "}
              </p>
            </div>
            {/* Game container made responsive */}
            <div className="w-full overflow-hidden">
              <JumpGame />
            </div>
          </div>
          <div className="p-4">
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-center w-full max-w-2xl mx-auto px-4">
          <div className="space-y-4">
            <div className="p-4">
              <p className="text-sm md:text-base">
                You must be authenticated to access the Game.{" "}
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <LoginButton provider="google" />
              <LoginButton provider="github" />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
