import Link from "next/link";
import { IoIosWarning } from "react-icons/io";

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  const errorMessageMap: Record<string, string> = {
    //Auth.js returned error message
    Configuration:
      "There is a problem with the server configuration. Check your environment variables.",
    AccessDenied: "You do not have permission to sign in.",
    Verification:
      "The sign-in link is no longer valid or has already been used.",
    Default: "Something went wront! Please try again.",
  };

  const errorMessage = error
    ? errorMessageMap[error] || errorMessageMap.Default
    : errorMessageMap.Default;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">
        Chiao-Fan&apos;s IAM Integration Showcase
      </h1>
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center">
        <IoIosWarning className="text-6xl mx-auto" />

        <h1 className="text-2xl font-bold text-gray-900">
          Authentication Error
        </h1>

        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          <p className="font-mono">{error}</p>
          <p className="mt-2">{errorMessage}</p>
        </div>

        <Link
          href="/"
          className="inline-block w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Return to Login
        </Link>
      </div>
    </div>
  );
}
