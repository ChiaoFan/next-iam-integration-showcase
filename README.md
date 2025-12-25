# Chiao-Fan's IAM Integration Showcase

An identity management showcase built with Next.js 15 and Auth.js v5. This project demonstrates the architectural implementation of GitHub and Google OAuth (SSO), focusing on secure session management and server-side authentication.

## Technical Stack

- **Framework:** Next.js 15 (App Router)
- **Authentication:** Auth.js v5 (Beta)
- **Identity Providers:** GitHub OAuth, Google OAuth
- **Styling:** Tailwind CSS
- **Environment:** Node.js v24

## Architecture & IAM Logic

This project demonstrates a **Multi-Provider OAuth 2.0** flow.

- **Server-Side Auth:** Using Next.js Server Components to securely handle session validation.
- **Pluggable Providers:** An extensible configuration in `auth.ts` allowing for easy integration of enterprise SSO (Single Sign-On).
- **Security:** CSRF protection and secure cookie management handled by Auth.js.
- **Error Handling:** Implemented a custom error-handling layer using a Record-based Mapping Pattern. This translates technical OAuth/OIDC error codes (e.g., Configuration, AccessDenied) into user-friendly instructions.

## Setup Instructions

1. Clone the repository to your local machine.
2. Install dependencies:
   npm install
3. Create a .env.local file in the root directory and add your credentials:

AUTH_SECRET=your_generated_secret
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret

4. Run the development server:
   npm run dev

Open http://localhost:3000 with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
