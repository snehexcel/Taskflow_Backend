'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { FieldGroup, FieldLabel } from '@/components/ui/field';
import { toast } from 'sonner';
import { Plus, LogOut, Menu, X, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { useTasks, type Task } from '@/hooks/use-tasks';

export default function DashboardPage() {
  const router = useRouter();
  const { tasks, isLoading, createTask, updateTask, deleteTask } = useTasks();
  const [user, setUser] = useState<{ full_name: string; email: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as const,
    status: 'pending' as const,
  });
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed'>('all');

  // Get user info and check auth
  useEffect(() => {
    const getUserInfo = async () => {
      try {
        // Since we don't have a /me endpoint yet, we can parse from the page
        const name = localStorage.getItem('user_name') || 'User';
        const email = localStorage.getItem('user_email') || '';
        setUser({ full_name: name, email });
      } catch (error) {
        router.push('/auth/login');
      }
    };

    getUserInfo();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/v1/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('user_name');
      localStorage.removeItem('user_email');
      toast.success('Logged out successfully');
      router.push('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTask.title.trim()) {
      toast.error('Task title is required');
      return;
    }

    try {
      await createTask({
        title: newTask.title,
        description: newTask.description || null,
        priority: newTask.priority,
        status: newTask.status,
        due_date: null
      });

      setNewTask({
        title: '',
        description: '',
        priority: 'medium',
        status: 'pending',
      });
      setShowNewTaskForm(false);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleStatusChange = async (taskId: string, newStatus: Task['status']) => {
    try {
      await updateTask(taskId, { status: newStatus });
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        // Error is handled in the hook
      }
    }
  };

  const filteredTasks =
    filter === 'all'
      ? tasks
      : tasks.filter((task) => task.status === filter);

  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const statusIcons = {
    pending: Circle,
    in_progress: AlertCircle,
    completed: CheckCircle2,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/dashboard" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              TaskFlow
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-sm">
                <p className="font-semibold text-gray-900">{user?.full_name}</p>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-blue-200 hover:bg-red-50"
              >
                <LogOut className="mr-2 w-4 h-4" />
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-blue-100">
              <div className="text-sm mb-4">
                <p className="font-semibold text-gray-900">{user?.full_name}</p>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="w-full border-blue-200 hover:bg-red-50"
              >
                <LogOut className="mr-2 w-4 h-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Your Tasks</h1>
            <p className="text-gray-600 mt-2">
              {filteredTasks.length} {filter === 'all' ? 'total' : filter} task{filteredTasks.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button
            onClick={() => setShowNewTaskForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Plus className="mr-2 w-4 h-4" />
            New Task
          </Button>
        </div>

        {/* New Task Form */}
        {showNewTaskForm && (
          <Card className="border-blue-100 mb-8 shadow-lg">
            <CardHeader>
              <CardTitle>Create New Task</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTask} className="space-y-4">
                <FieldGroup>
                  <FieldLabel className="text-gray-700">Task Title *</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Enter task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="border-blue-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </FieldGroup>

                <FieldGroup>
                  <FieldLabel className="text-gray-700">Description</FieldLabel>
                  <textarea
                    placeholder="Enter task description (optional)"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    rows={3}
                  />
                </FieldGroup>

                <div className="grid grid-cols-2 gap-4">
                  <FieldGroup>
                    <FieldLabel className="text-gray-700">Priority</FieldLabel>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </FieldGroup>

                  <FieldGroup>
                    <FieldLabel className="text-gray-700">Status</FieldLabel>
                    <select
                      value={newTask.status}
                      onChange={(e) => setNewTask({ ...newTask, status: e.target.value as any })}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </FieldGroup>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Create Task
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowNewTaskForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['all', 'pending', 'in_progress', 'completed'].map((f) => (
            <Button
              key={f}
              onClick={() => setFilter(f as any)}
              variant={filter === f ? 'default' : 'outline'}
              className={filter === f ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : ''}
            >
              {f.charAt(0).toUpperCase() + f.slice(1).replace('_', ' ')}
            </Button>
          ))}
        </div>

        {/* Tasks Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-white rounded-lg animate-pulse" />
            ))}
          </div>
        ) : filteredTasks.length === 0 ? (
          <Card className="border-blue-100 text-center py-12">
            <div className="space-y-4">
              <CheckCircle2 className="w-16 h-16 mx-auto text-blue-300" />
              <h3 className="text-xl font-semibold text-gray-900">
                {filter === 'all' ? 'No tasks yet' : `No ${filter} tasks`}
              </h3>
              <p className="text-gray-600">
                {filter === 'all'
                  ? 'Create your first task to get started'
                  : 'All your other tasks are in different categories'}
              </p>
              {filter === 'all' && (
                <Button
                  onClick={() => setShowNewTaskForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                >
                  <Plus className="mr-2 w-4 h-4" />
                  Create First Task
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => {
              const StatusIcon = statusIcons[task.status];
              return (
                <Card
                  key={task.id}
                  className="border-blue-100 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="line-clamp-2">{task.title}</CardTitle>
                      <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${priorityColors[task.priority]}`}>
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {task.description && (
                      <p className="text-sm text-gray-600 line-clamp-3">{task.description}</p>
                    )}

                    <div className="flex items-center gap-2">
                      <StatusIcon className="w-4 h-4 text-gray-600" />
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value as Task['status'])}
                        className="text-sm px-2 py-1 border border-blue-200 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-blue-200 hover:bg-blue-50"
                        onClick={() => {
                          // Edit modal could be implemented here
                          toast.info('Edit feature coming soon');
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-200 hover:bg-red-50"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-blue-100 bg-white/50 backdrop-blur-sm mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2026 TaskFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
