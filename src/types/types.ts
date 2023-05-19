import { SvgIconProps } from "@mui/material";
import { ElementType, ReactNode } from "react";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  description?: string | null;
  dueDate?: string;
  created_at?: string;
  updated_at?: string;
}

export interface NewTodoState {
  id: null | number;
  title: string;
  dueDate: string;
  description: string | "";
}

export interface TodoDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

export interface InputTodoDialogTitleProps {
  onClose: () => void;
  children?: ReactNode;
}

export interface ActionIconButtonProps {
  onClick: () => void;
  icon: ElementType<SvgIconProps>;
  label: string;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | undefined;
}

export interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  todo: Todo;
}

export interface TodoDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  isEditing: boolean;
  editingTodo?: Todo;
}

export interface TodoState {
  todos: Todo[];
}
