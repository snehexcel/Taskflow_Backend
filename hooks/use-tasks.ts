'use client';

import { useEffect, useState, useCallback } from 'react';
import { toast } from 'sonner';

export interface Task {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

interface UseTasks {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  createTask: (data: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateTask: (id: string, data: Partial<Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  refetch: () => Promise<void>;
}

export function useTasks(): UseTasks {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/v1/tasks', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(
    async (taskData: any) => {
      try {
        const response = await fetch('/api/v1/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to create task');
        }

        const data = await response.json();
        setTasks((prev) => [data.task, ...prev]);
        toast.success('Task created successfully');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        toast.error(message);
        throw err;
      }
    },
    []
  );

  const updateTask = useCallback(
    async (id: string, taskData: any) => {
      try {
        const response = await fetch(`/api/v1/tasks/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(taskData),
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to update task');
        }

        const data = await response.json();
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? data.task : task))
        );
        toast.success('Task updated successfully');
      } catch (err) {
        const message = err instanceof Error ? err.message : 'An error occurred';
        toast.error(message);
        throw err;
      }
    },
    []
  );

  const deleteTask = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/v1/tasks/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      toast.error(message);
      throw err;
    }
  }, []);

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
}
