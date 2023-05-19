import { createTodo, getAllTodos, updateTodo } from "@/api/todoRepository";
import { resetNewTodo } from "@/features/newTodoSlice";
import { setTodos } from "@/features/todoSlice";
import { RootState } from "@/store";
import { Todo } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";

export const useSaveTodo = (onSave: () => void) => {
  const dispatch = useDispatch();
  const newTodo = useSelector((state: RootState) => state.newTodo);

  const saveTodo = async (isEdit: boolean, todo: Todo | null) => {
    console.log("isEdit", isEdit)
    console.log("todo", todo)
    if (isEdit && todo) {
      const { id, ...newTodoWithoutId } = newTodo
        await updateTodo({...todo, ...newTodoWithoutId})
      

    } else {

      await createTodo({
        id: null,
        title: newTodo.title,
        dueDate: newTodo.dueDate,
        description: newTodo.description
      })

    }

    const updatedTodos = await getAllTodos();

    dispatch(setTodos(updatedTodos));

    dispatch(resetNewTodo());

    onSave();
  };

  return saveTodo;
};
