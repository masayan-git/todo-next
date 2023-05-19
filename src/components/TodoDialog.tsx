import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetNewTodo,
  setTitle,
  setDueDate,
  setDescription,
  setId,
} from "@/features/newTodoSlice";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { RootState } from "@/store";
import { InputTodoDialogTitleProps, TodoDialogProps } from "@/types/types";
import { useSaveTodo } from "@/utils/useSaveTodo";

const InputTodoDialogTitle = (props: InputTodoDialogTitleProps) => {
  const { children, onClose } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export const TodoDialog: FC<TodoDialogProps> = ({
  open,
  onClose,
  onSave,
  isEditing,
  editingTodo,
}) => {
  const dispatch = useDispatch();
  const newTodo = useSelector((state: RootState) => state.newTodo);
  const saveTodo = useSaveTodo(onSave);

  useEffect(() => {
    if (isEditing && editingTodo) {
      dispatch(setId(editingTodo.id));
      dispatch(setTitle(editingTodo.title));
      dispatch(setDueDate(editingTodo.dueDate ?? ""));
      dispatch(setDescription(editingTodo.description ?? ""));
    } else {
      dispatch(resetNewTodo());
    }
  }, [isEditing, editingTodo, dispatch]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth={true}>
      <InputTodoDialogTitle onClose={onClose}>作成</InputTodoDialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "24px",
          }}
        >
          <Box>
            タイトル
            <TextField
              label=""
              maxRows={4}
              fullWidth={true}
              value={newTodo.title}
              onChange={(e) => dispatch(setTitle(e.target.value))}
            />
          </Box>
          <Box sx={{ display: "grid" }}>
            期限
            <DatePicker
              format="YYYY/MM/DD"
              defaultValue={dayjs()}
              value={dayjs(newTodo.dueDate)}
              onChange={(date) =>
                dispatch(setDueDate(date?.utc().format("YYYY/MM/DD") ?? ""))
              }
            />
          </Box>
          <Box>
            コメント
            <TextField
              multiline
              rows={4}
              fullWidth={true}
              value={newTodo.description}
              onChange={(e) => dispatch(setDescription(e.target.value))}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>キャンセル</Button>
        <Button
          disabled={!newTodo.title}
          onClick={() => saveTodo(isEditing, editingTodo ?? null)}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};
