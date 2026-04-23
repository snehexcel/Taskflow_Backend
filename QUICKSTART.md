# TaskFlow - Quick Start Guide

Get TaskFlow running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free at supabase.com)
- A code editor (VS Code recommended)

## Step 1: Clone & Install (1 minute)

```bash
# Clone the repository
git clone <your-repo-url>
cd taskflow

# Install dependencies
pnpm install
# or: npm install
```

## Step 2: Setup Supabase (2 minutes)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note your credentials from **Settings > API**:
   - Project URL
   - Anon Public Key
   - Service Role Key
3. Get JWT Secret from **Settings > Database**

## Step 3: Create Environment File (1 minute)

Create `.env.local` in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_JWT_SECRET=your_jwt_secret_here
```

## Step 4: Run Database Migrations (1 minute)

```bash
NEXT_PUBLIC_SUPABASE_URL=your_url \
SUPABASE_SERVICE_ROLE_KEY=your_key \
SUPABASE_JWT_SECRET=your_secret \
node scripts/run-migration.js
```

Or manually:
1. Go to Supabase SQL Editor
2. Copy content from `scripts/01-setup-database.sql`
3. Paste into SQL Editor
4. Click "Run"

## Step 5: Start Development Server

```bash
pnpm dev
# or: npm run dev
```

Visit http://localhost:3000 and start using TaskFlow!

## Quick Test Flow

1. **Home Page**: Browse http://localhost:3000
2. **Register**: Click "Get Started" and create an account
3. **Login**: Login with your credentials
4. **Dashboard**: Create and manage tasks
5. **Logout**: Test logout functionality

## Common Commands

```bash
# Start dev server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## File Structure Overview

```
taskflow/
├── app/                    # Pages and API routes
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── auth/              # Login/Register pages
│   ├── dashboard/         # Protected dashboard
│   └── api/v1/            # API endpoints
├── components/            # React components
├── hooks/                 # Custom hooks
├── lib/                   # Utilities
└── scripts/              # Database scripts
```

## API Quick Reference

### Register
```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123",
    "full_name": "Test User"
  }'
```

### Create Task
```bash
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{
    "title": "My Task",
    "priority": "high"
  }'
```

## Troubleshooting

**Issue**: Environment variables not loading
- Solution: Restart dev server after adding `.env.local`

**Issue**: Database connection failed
- Solution: Check Supabase project is running and credentials are correct

**Issue**: Port 3000 already in use
- Solution: `pnpm dev -- -p 3001` to use different port

**Issue**: Dependencies not installing
- Solution: Clear cache and reinstall
  ```bash
  rm -rf node_modules pnpm-lock.yaml
  pnpm install
  ```

## Next Steps

1. Read [README.md](./README.md) for full documentation
2. Check [API.md](./API.md) for complete API reference
3. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
4. Explore code in `app/` directory

## Deployment Quick Links

- [Deploy to Vercel](./DEPLOYMENT.md#step-3-deploy-to-vercel)
- [Setup Custom Domain](./DEPLOYMENT.md#step-4-setup-custom-domain-optional)
- [Configure CI/CD](./DEPLOYMENT.md#continuous-deployment)

## Support

- GitHub Issues: [Create an issue](https://github.com/yourusername/taskflow/issues)
- Email: support@taskflow.app
- Documentation: Read README.md and API.md

---

**Happy coding!** 🚀

Questions? Check the [documentation](./README.md) or [open an issue](https://github.com/yourusername/taskflow/issues)
