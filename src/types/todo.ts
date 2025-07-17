export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  due_date?: string; // ISO string
  priority?: Priority;
  user_id?: string;
  is_deleted: boolean;
  created_at?: string;
  updated_at?: string;
} 