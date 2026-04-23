# TaskFlow - Full-Stack Task Management Application

A modern, production-ready task management application built with Next.js, TypeScript, Supabase, and Tailwind CSS.

## Features

- **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- **Task Management**: Create, read, update, and delete tasks with priorities and status tracking
- **Role-Based Access Control**: Support for admin and user roles
- **Real-time Updates**: Instant task synchronization across devices
- **Row Level Security (RLS)**: Database-level security with Supabase RLS policies
- **Responsive Design**: Beautiful UI that works on all devices
- **Type-Safe**: Built with TypeScript for maximum reliability

## Tech Stack

### Frontend
- **Next.js 16**: Latest React framework with App Router
- **React 19**: Latest React version with improved hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Modern utility-first CSS framework
- **shadcn/ui**: High-quality component library
- **Lucide Icons**: Beautiful icon set

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **Node.js**: JavaScript runtime for backend logic
- **JWT Authentication**: Secure token-based authentication
- **bcryptjs**: Password hashing and verification

### Database
- **PostgreSQL**: Robust relational database
- **Supabase**: Managed PostgreSQL hosting with built-in auth and RLS

### Deployment
- **Vercel**: Optimal hosting for Next.js applications
- **Automated CI/CD**: Seamless deployments on push

## Project Structure

```
taskflow/
├── app/                          # Next.js App Router
│   ├── api/v1/                   # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── logout/
│   │   │   └── me/
│   │   └── tasks/                # Task CRUD endpoints
│   ├── auth/                     # Auth pages
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/                # Protected dashboard
│   ├── about/                    # About page
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   └── ui/                       # shadcn/ui components
├── hooks/                        # Custom React hooks
│   ├── use-auth.ts              # Authentication hook
│   └── use-tasks.ts             # Task management hook
├── lib/                         # Utility functions
│   ├── auth.ts                  # JWT and password utilities
│   ├── supabase-client.ts       # Supabase client setup
│   └── utils.ts                 # General utilities
├── scripts/                     # Database and setup scripts
│   └── 01-setup-database.sql    # Database schema
├── middleware.ts                # Next.js middleware for protected routes
├── package.json                 # Dependencies
└── tailwind.config.ts          # Tailwind configuration
```

## Prerequisites

- Node.js 18+ (v20 recommended)
- npm, yarn, pnpm, or bun
- Supabase account (free at supabase.com)
- Vercel account (for deployment)

## Environment Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd taskflow
```

### 2. Install Dependencies
```bash
pnpm install
# or npm install
# or yarn install
```

### 3. Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your project credentials:
   - Supabase URL
   - Supabase Anon Key
   - Supabase Service Role Key
   - JWT Secret

3. Run the database migration:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_url \
SUPABASE_SERVICE_ROLE_KEY=your_key \
SUPABASE_JWT_SECRET=your_secret \
node scripts/run-migration.js
```

### 4. Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret

# Application
NODE_ENV=development
```

### 5. Run Development Server

```bash
pnpm dev
# or npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## API Documentation

### Authentication Endpoints

#### Register
```
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123",
  "full_name": "John Doe"
}

Response: 201 Created
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user"
  }
}
```

#### Login
```
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword123"
}

Response: 200 OK
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user"
  }
}
```

#### Logout
```
POST /api/v1/auth/logout

Response: 200 OK
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### Get Current User
```
GET /api/v1/auth/me
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "user"
  }
}
```

### Task Endpoints

#### Get All Tasks
```
GET /api/v1/tasks
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "tasks": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "title": "Task Title",
      "description": "Task description",
      "status": "pending",
      "priority": "high",
      "due_date": "2024-12-31T23:59:59Z",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Create Task
```
POST /api/v1/tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "status": "pending",
  "priority": "medium",
  "due_date": "2024-12-31T23:59:59Z"
}

Response: 201 Created
{
  "success": true,
  "task": { ... }
}
```

#### Update Task
```
PATCH /api/v1/tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "in_progress"
}

Response: 200 OK
{
  "success": true,
  "task": { ... }
}
```

#### Delete Task
```
DELETE /api/v1/tasks/:id
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Task deleted"
}
```

## Deployment to Vercel

### 1. Connect GitHub Repository

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository

### 2. Configure Environment Variables

In Vercel project settings, add the following environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret
```

### 3. Deploy

1. Click "Deploy"
2. Vercel will automatically build and deploy your application
3. Your app will be available at a unique Vercel URL

### 4. Setup Custom Domain (Optional)

In Vercel project settings, add your custom domain and configure DNS records.

## Security Best Practices

- **Password Hashing**: All passwords are hashed using bcryptjs with 10 salt rounds
- **JWT Tokens**: Secure JWT tokens stored in HTTP-only cookies
- **CORS Protection**: Configured to prevent cross-origin attacks
- **SQL Injection Prevention**: Using parameterized queries
- **Input Validation**: All inputs validated with Zod
- **Row Level Security**: Database-level security with Supabase RLS policies
- **HTTPS Only**: Secure cookies configured for production

## Performance Optimizations

- **Next.js Optimizations**: Image optimization, code splitting
- **Database Indexing**: Strategic indexes on frequently queried columns
- **Caching**: Browser and server-side caching strategies
- **API Response Optimization**: Minimal payload sizes
- **Lazy Loading**: Components loaded on demand

## Monitoring and Logging

- **Error Tracking**: Console error logging (integrate with Sentry for production)
- **Database Logs**: Monitor query performance
- **API Logging**: Track request/response patterns

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@taskflow.app or open an issue on GitHub.

## FAQ

**Q: Can I use this as a template for my project?**
A: Yes! The project is designed to be used as a template for building task management applications.

**Q: How do I add more features?**
A: The architecture supports easy feature additions. Follow the existing patterns for API routes and components.

**Q: Is this production-ready?**
A: Yes, the application includes security best practices and can be deployed to production immediately.

**Q: How do I scale this application?**
A: The application is designed to scale with Vercel and Supabase's infrastructure.

## Roadmap

- [ ] Team collaboration features
- [ ] Task comments and attachments
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered task suggestions
- [ ] Calendar view integration
- [ ] Notification system
- [ ] Integration with Slack and email

---

Built with ❤️ by the TaskFlow team
