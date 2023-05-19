import { Todo, NewTodoState } from "@/types/types"; 

export const updateTodo = async (updatedTodo: Todo) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/todos/${updatedTodo.id}`, {
      method: "PUT",
      headers: {
        [process.env.NEXT_PUBLIC_API_KEY_NAME as string]: process.env
          .NEXT_PUBLIC_API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const getAllTodos = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/todos`, {
      headers: {
        [process.env.NEXT_PUBLIC_API_KEY_NAME as string]: process.env
          .NEXT_PUBLIC_API_KEY as string,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const createTodo = async (newTodo: NewTodoState) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/todos`, {
      method: "POST",
      headers: {
        [process.env.NEXT_PUBLIC_API_KEY_NAME as string]: process.env
          .NEXT_PUBLIC_API_KEY as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    return true;
  } catch (error) {
    throw error;
  }
};

export const getTodo = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/todos/${id}`,
      {
        headers: {
          [process.env.NEXT_PUBLIC_API_KEY_NAME as string]: process.env
            .NEXT_PUBLIC_API_KEY as string,
        },
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/todos/${id}`, {
      method: "DELETE",
      headers: {
        [process.env.NEXT_PUBLIC_API_KEY_NAME as string]: process.env
          .NEXT_PUBLIC_API_KEY as string,
      },
    });

    return true;
  } catch (error) {
    throw error;
  }
};
