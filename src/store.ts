import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/todoSlice";
import newTodoReducer from "./features/newTodoSlice"

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    newTodo: newTodoReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch