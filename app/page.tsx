import { auth, signOut } from "@/auth";
import LoginButton from "./components/LoginButton";
import JumpGame from "./components/JumpGame";

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  OAuthCallbackError:
    "Connection failed. Please check your login provider settings.",
  AccessDenied: "Access denied. You do not have permission to view this page.",
  default: "Authentication failed. Please try again or contact support.",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  const { error } = await searchParams;

  // 2. Logic to pick the message (Added) a
  const errorMessage = error
    ? AUTH_ERROR_MESSAGES[error] || AUTH_ERROR_MESSAGES.default
    : null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center px-2">
        Chiao-Fan&apos;s Identity and Access Management Showcase
      </h1>
      <div>
        {error && (
          <div className="bg-red-100 text-red-600 p-4 rounded-md mb-4 text-sm md:text-base border-l-4 border-red-500">
            {/* 3. Using the professional message here */}
            <p className="font-bold text-xs uppercase mb-1">Security Alert</p>
            {errorMessage}
          </div>
        )}
      </div>
      {session ? (
        <div className="text-center w-full max-w-2xl mx-auto px-2">
          <div className="space-y-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex flex-col items-center gap-1">
                <p className="text-sm md:text-base">
                  Welcome,{" "}
                  <span className="font-semibold">{session.user?.name}</span>!
                  Authentication successful.
                </p>
                {/* 4. Small Role Badge for the IAM Demo (Added) */}
                <span className="bg-green-200 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                  Role: Authorized_User
                </span>
              </div>
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
                You must be authenticated via an Identity Provider to access the
                Game.
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
