import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken, AUTH_COOKIE_NAME } from '@/lib/auth';
import { getSupabaseAdmin } from '@/lib/supabase-client';

// ✅ REQUIRED for jsonwebtoken
export const runtime = 'nodejs';

// ✅ Validation schema
const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().optional(),
  status: z.enum(['pending', 'in_progress', 'completed']).default('pending'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  due_date: z.string().optional(), // safer than datetime()
});

// ✅ Extract token from cookie or header
function getTokenFromRequest(req: NextRequest): string | null {
  const cookieToken = req.cookies.get(AUTH_COOKIE_NAME)?.value;
  if (cookieToken) return cookieToken;

  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.replace('Bearer ', '').trim();
  }

  return null;
}

// ✅ Authenticate request
function authenticateRequest(req: NextRequest): { userId: string } | null {
  const token = getTokenFromRequest(req);
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload || !payload.sub) return null;

  return { userId: payload.sub };
}

//
// 🔹 GET: Fetch all tasks
//
export async function GET(req: NextRequest) {
  try {
    const auth = authenticateRequest(req);

    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', auth.userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to fetch tasks' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, tasks },
      { status: 200 }
    );
  } catch (err) {
    console.error('GET tasks error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

//
// 🔹 POST: Create new task
//
export async function POST(req: NextRequest) {
  try {
    const auth = authenticateRequest(req);

    if (!auth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    const validation = createTaskSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validation.error.errors,
        },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const { data: task, error } = await supabase
      .from('tasks')
      .insert({
        user_id: auth.userId,
        ...validation.data,
      })
      .select()
      .single();

    if (error || !task) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: error?.message || 'Failed to create task' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, task },
      { status: 201 }
    );
  } catch (err) {
    console.error('POST task error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}