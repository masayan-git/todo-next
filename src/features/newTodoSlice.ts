import { NewTodoState } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";




const initialState: NewTodoState = {
  id: null,
  title:"",
  dueDate: dayjs().format("YYYY/MM/DD"),
  description: ""
}

export const newTodoSlice = createSlice({
  name: "newTodo",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number | null>) => {
      state.id = action.payload
    },
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    },
    setDueDate: (state, action: PayloadAction<string>) => {
      state.dueDate = action.payload
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload
    },
    resetNewTodo: (state) => {
      state.id = initialState.id
      state.title = initialState.title;
      state.dueDate = dayjs().format("YYYY/MM/DD");
      state.description = initialState.description;
    }
  }

})

export const {setId, setTitle, setDueDate, setDescription, resetNewTodo } = newTodoSlice.actions

export default newTodoSlice.reducer