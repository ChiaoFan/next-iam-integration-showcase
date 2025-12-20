// src/app/page.tsx (or app/page.tsx if you don't have src folder)
import { auth, signIn, signOut } from "@/auth"

export default async function Home() {
  const session = await auth()

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Chiao-Fan&apos;s IAM Integration Showcase</h1>
      
      {session ? (
        <div className="text-center max-w-2xl mx-auto"> {/* Added max-w-2xl and mx-auto for better readability */}
          <h2 className="text-2xl font-semibold mb-4 text-green-600">Authentication Successful!</h2>
          <p className="mb-6 text-lg">
            Welcome back, <span className="font-bold text-blue-700">{session.user?.name}</span>!
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            This showcase demonstrates a robust **Next.js 15 App Router** integration with **Auth.js v5 (NextAuth)** for secure Identity and Access Management.
            Leveraging **Server Components** and **Server Actions**, it provides a streamlined, full-stack authentication flow
            via **GitHub OAuth**, ensuring secure user sessions and data access.
          </p>
          <form action={async () => {
            "use server"
            await signOut()
          }}>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-colors">
              Sign Out
            </button>
          </form>
        </div>
      ) : (
        <form action={async () => {
          "use server"
          await signIn("github")
        }}>
          <button className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-gray-800 cursor-pointer transition-colors">
            Login with GitHub
          </button>
        </form>
      )}
    </main>
  )
}