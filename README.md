# Chiao-Fan's Identity and Access Management Showcase

By bridging OAuth 2.0 with a custom-built game engine, this project showcases a 'Login-to-Play' flow that grants users instant access to the game upon authenticating with Google or GitHub.

Most modern security breaches happen because of poorly managed credentials. I built this application to demonstrate how to eliminate password liability while providing a high-trust, frictionless user experience. By integrating Google and GitHub SSO, we ensure sensitive credentials never enter our system. This allows us to rely on industry-leading security standards while keeping our own database lean and secure.

## Live Demo

Check out the live application here: [https://chiao-game.vercel.app/](https://chiao-game.vercel.app/)

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

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Learn Auth.js](https://authjs.dev/)
- [Setup OAuth with GitHub](https://authjs.dev/guides/configuring-github) - setting up Auth.js in your application to be able to log in with GitHub.
