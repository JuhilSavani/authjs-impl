# Next.js Application with Authentication

A demonstration of AuthJS v5 in Next.js with multiple authentication providers, database integration, and protected routes.

---

## Technology Stack

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [NextAuth.js](https://authjs.dev/) - Authentication
- [Drizzle ORM](https://orm.drizzle.team/docs/overview) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/), [Shadcn](https://ui.shadcn.com/) - Styling
- [Zod](https://zod.dev/) - Schema validation on runtime

## Project Structure

```
├── src/
│   ├── app/           
│   ├── components/    
│   ├── db/          
│   ├── lib/ 
│   ├── auth.ts        
│   └── middleware.ts   
├── public/           
├── .env.local       
├── auth.config.ts    
├── drizzle.config.ts 
└── tailwind.config.ts
```

## Features

- User authentication with NextAuth.js
- Support for multiple auth providers:
  - Google
  - GitHub
  - Credentials (username/password)
- Type-safe database queries with Drizzle ORM
- Responsive UI with Tailwind CSS
- Form validation using Zod schemas

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (v14.x or higher): Required to run the server and client applications.
- npm (v6.x or higher): Package managers to install dependencies.
- PostgreSQL: The database used for storing user information. Ensure you have it installed and set up locally or have access to a remote PostgreSQL instance.

**You will also need:**
- A [Google Cloud Platform](https://console.cloud.google.com/) account for Google OAuth
- A [GitHub](https://github.com/) account for GitHub OAuth

### Installation
1. Clone the repository
    ```bash
    git clone https://github.com/JuhilSavani/authjs-impl.git
    cd authjs-impl
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file with required environment variables:
    ```bash
    AUTH_SECRET="your_auth_secret_here"
    DATABASE_URL="postgres://username:password@host:port/database"

    GITHUB_CLIENT_ID="your_github_client_id"
    GITHUB_CLIENT_SECRET="your_github_client_secret"

    GOOGLE_CLIENT_ID="your_google_client_id"
    GOOGLE_CLIENT_SECRET="your_google_client_secret"
    ```

4. Database setup:<br/>
This project uses PostgreSQL as its database management system. Follow the steps below to set up the database.
    - Open the terminal on your system.
    - Run the following Command to create a database.
      ```bash
      psql -U postgres -c "CREATE DATABASE authjs_impl_db;"
      ```
    If you encounter a command not found error for psql, you may need to add PostgreSQL to your system’s PATH environment variable.

5. Run the development server:
    ```bash
    npm run dev
    ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Components

- `page.tsx` - Home page component
- Authentication routes:
  - API routes for handling auth requests
  - Protected routes using middleware
- Database models for user data
- Reusable UI components

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

--- 

**Happy Contributing, 🚀!**