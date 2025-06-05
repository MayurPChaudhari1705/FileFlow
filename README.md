# FileFlow

FileFlow is a modern web application for file management and user authentication, built with Next.js, Appwrite, and Tailwind CSS.

## Features

- User authentication (sign up, sign in, OTP verification)
- Secure session management using Appwrite
- File upload and management
- Responsive UI with Tailwind CSS
- Protected routes and server-side authorization
- Modular and scalable code structure

## Tech Stack

- [Next.js](https://nextjs.org/)
- [Appwrite](https://appwrite.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- An [Appwrite](https://appwrite.io/) project (cloud or self-hosted)

### Installation

1. **Clone the repository:**
   git clone https://github.com/MayurPChaudhari1705/FileFlow.git
   cd fileflow

2. Install dependencies:
   npm install

3. Configure environment variables:
Create a .env.local file in the root directory and add your Appwrite credentials:
NEXT_PUBLIC_APPWRITE_PROJECT=your_project_id
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_DATABASE=your_database_id
NEXT_PUBLIC_APPWRITE_USER_COLLECTION=your_user_collection_id
NEXT_PUBLIC_APPWRITE_FILE_COLLECTION=your_file_collection_id
NEXT_PUBLIC_APPWRITE_BUCKET=your_bucket_id
NEXT_APPWRITE_API_KEY=your_appwrite_api_key

4. Run the development server:
   npm run dev

5. Open your browser:
   http://localhost:3000

Project Structure
fileflow/
├── app/                # Next.js app directory
│   ├── (root)/         # Main layout and pages
│   ├── (api)/          # API routes
│   └── globals.css     # Global styles (Tailwind)
├── components/         # React components (AuthForm, Header, Sidebar, etc.)
├── lib/                # Appwrite config, actions, and utilities
│   └── appwrite/
├── public/             # Static assets
├── [.env.local](http://_vscodecontentref_/0)          # Environment variables
├── [README.md](http://_vscodecontentref_/1)
└── ...

Authentication Flow
Sign Up: Users register with their name and email. An OTP is sent for verification.
Sign In: Users log in with their email and password. Session is managed via Appwrite and cookies.
Server-side Authorization: Protected routes/components use the session cookie to authorize users on the server.


License
This project is licensed under the MIT License.