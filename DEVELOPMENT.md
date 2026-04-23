# TaskFlow Development Guide

This guide helps developers understand and extend the TaskFlow codebase.

## Architecture Overview

### Directory Structure

```
app/
├── api/v1/              # REST API v1
│   ├── auth/           # Authentication endpoints
│   └── tasks/          # Task management endpoints
├── auth/               # Auth pages
│   ├── login/
│   └── register/
├── dashboard/          # Protected dashboard
├── about/              # About page
├── page.tsx            # Home page
└── layout.tsx          # Root layout

components/
└── ui/                 # shadcn/ui components

hooks/
├── use-auth.ts         # Auth hook
└── use-tasks.ts        # Tasks hook

lib/
├── auth.ts             # Auth utilities
├── supabase-client.ts  # Supabase setup
└── utils.ts            # General utilities

middleware.ts           # Route protection
```

## Development Workflow

### Starting Development

```bash
# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run migrations
node scripts/run-migration.js

# Start dev server
pnpm dev
```

## Code Patterns

### API Route Pattern

All API routes follow this pattern:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    // 1. Parse request
    const body = await req.json();

    // 2. Validate input
    const validation = schema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.error.errors },
        { status: 400 }
      );
    }

    // 3. Check authentication (if required)
    const token = req.cookies.get(AUTH_COOKIE_NAME)?.value;
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 4. Perform operation
    const result = await supabase.from('table').insert(...);

    // 5. Return success
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### React Component Pattern

```typescript
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function MyComponent() {
  const [state, setState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch data on mount
  }, []);

  const handleAction = async () => {
    try {
      setIsLoading(true);
      // Perform action
      toast.success('Success!');
    } catch (error) {
      toast.error('Error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### Custom Hook Pattern

```typescript
'use client';

import { useState, useCallback } from 'react';

export function useCustom() {
  const [state, setState] = useState(null);

  const action = useCallback(async (data) => {
    try {
      const response = await fetch('/api/v1/endpoint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const result = await response.json();
      setState(result.data);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }, []);

  return { state, action };
}
```

## Adding New Features

### Add a New API Endpoint

1. Create route file: `app/api/v1/[resource]/route.ts`
2. Implement handler functions (GET, POST, etc.)
3. Add validation schema using Zod
4. Include authentication check if needed
5. Return proper status codes and responses

Example:
```typescript
// app/api/v1/users/route.ts
export async function GET(req: NextRequest) {
  // Implementation
}

export async function POST(req: NextRequest) {
  // Implementation
}
```

### Add a New Page

1. Create directory: `app/[page-name]/`
2. Create `page.tsx` file
3. Add layout if needed
4. Use existing components
5. Add navigation links

Example structure:
```
app/
├── my-page/
│   └── page.tsx
```

### Add a Custom Hook

1. Create file: `hooks/use-[feature].ts`
2. Implement hook logic
3. Export custom hook
4. Use in components

Example:
```typescript
// hooks/use-notifications.ts
export function useNotifications() {
  // Implementation
  return { notifications, markRead, delete: deleteNotification };
}
```

### Add a New Component

1. Create component file: `components/[component].tsx`
2. Define props interface
3. Implement component
4. Export component

Example:
```typescript
// components/TaskCard.tsx
interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, data: any) => void;
}

export function TaskCard({ task, onUpdate }: TaskCardProps) {
  // Implementation
}
```

## Database Operations

### Query Examples

```typescript
import { getSupabaseAdmin } from '@/lib/supabase-client';

const supabase = getSupabaseAdmin();

// SELECT
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
  .single();

// INSERT
const { data, error } = await supabase
  .from('tasks')
  .insert({ user_id, title, ... })
  .select()
  .single();

// UPDATE
const { data, error } = await supabase
  .from('tasks')
  .update({ status: 'completed' })
  .eq('id', taskId)
  .select()
  .single();

// DELETE
const { error } = await supabase
  .from('tasks')
  .delete()
  .eq('id', taskId);

// COUNT
const { count, error } = await supabase
  .from('tasks')
  .select('*', { count: 'exact', head: true })
  .eq('user_id', userId);
```

## Authentication

### Token Management

```typescript
import { verifyToken, generateAccessToken } from '@/lib/auth';

// Verify JWT token
const payload = verifyToken(token);

// Generate new token
const token = generateAccessToken({
  sub: userId,
  email: userEmail,
  role: userRole,
});
```

### Password Security

```typescript
import { hashPassword, verifyPassword } from '@/lib/auth';

// Hash password (on registration)
const hash = await hashPassword(password);

// Verify password (on login)
const isValid = await verifyPassword(inputPassword, storedHash);
```

## Testing

### Manual Testing Workflow

```bash
# 1. Register new account
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "Password123", "full_name": "Test"}'

# 2. Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "Password123"}' \
  -c cookies.txt

# 3. Create task
curl -X POST http://localhost:3000/api/v1/tasks \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title": "Test Task"}'

# 4. Get tasks
curl http://localhost:3000/api/v1/tasks -b cookies.txt
```

## Debugging

### Browser DevTools

- **Network tab**: Check API calls and responses
- **Console**: Look for errors and debug logs
- **Storage**: Verify cookies are set correctly

### Server Logs

```bash
# Watch console output from dev server
pnpm dev

# Look for error messages and stack traces
```

### Database Logs

1. Go to Supabase dashboard
2. Click "Logs"
3. View recent database operations
4. Check slow queries

## Performance Optimization

### API Response Optimization

```typescript
// ✅ Good: Select only needed columns
const { data } = await supabase
  .from('users')
  .select('id, email, full_name')
  .eq('id', userId)
  .single();

// ❌ Avoid: Select all columns
const { data } = await supabase
  .from('users')
  .select('*')
  .eq('id', userId)
  .single();
```

### Component Optimization

```typescript
// ✅ Use React.memo for expensive components
export const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});

// ✅ Use useCallback for event handlers
const handleClick = useCallback(() => {
  // Handler
}, [dependencies]);

// ✅ Use useMemo for expensive computations
const filtered = useMemo(() => {
  return data.filter(item => item.active);
}, [data]);
```

## Type Safety

### Define Types

```typescript
// lib/types.ts
export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'user' | 'admin';
}

export interface Task {
  id: string;
  user_id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
}
```

### Use Zod for Validation

```typescript
import { z } from 'zod';

const taskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']),
});

const validation = taskSchema.safeParse(data);
```

## Error Handling

### Standard Error Response

```typescript
// Expected format
{
  "error": "Error message",
  "details": [
    {
      "field": "email",
      "message": "Invalid email"
    }
  ]
}
```

### Handle Errors in Components

```typescript
try {
  const response = await fetch('/api/v1/endpoint');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to perform action');
  }
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  toast.error(message);
}
```

## Deployment

### Build Process

```bash
# Build for production
pnpm build

# Start production server locally
pnpm start

# Check build output size
du -sh .next
```

### Environment Variables

Ensure all required variables are set:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY
- SUPABASE_JWT_SECRET

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to GitHub
git push origin feature/new-feature

# Create Pull Request
# (On GitHub)

# Merge when approved
```

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Troubleshooting

### Build Errors

```bash
# Clear build cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Try building again
pnpm build
```

### Type Errors

```bash
# Check TypeScript compilation
pnpm tsc --noEmit

# Fix type errors before deploying
```

### Database Issues

1. Verify Supabase project is running
2. Check credentials in environment variables
3. Test connection with Supabase dashboard
4. Review database logs for errors

---

Happy coding! 🚀

Questions? Check [README.md](./README.md) or open an issue on GitHub.
