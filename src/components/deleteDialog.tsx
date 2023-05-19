import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { InputTodoDialogTitleProps, Todo } from "@/types/types";
import { deleteTodo } from "@/api/todoRepository";
import { useDispatch } from "react-redux";
import { deleteTodoFromState } from "@/features/todoSlice";
import { useRouter } from "next/router";
import { DeleteDialogProps } from "@/types/types";

const DeleteDialogTitle = (props: InputTodoDialogTitleProps) => {
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

export const DeleteDialog = ({ open, onClose, todo }: DeleteDialogProps) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const onDeleteClick = async () => {
    try {
      const success = await deleteTodo(todo.id.toString());
      if (success) {
        dispatch(deleteTodoFromState(todo.id));
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth={true}>
      <DeleteDialogTitle onClose={onClose}>確認</DeleteDialogTitle>
      <DialogContent dividers>
        <Box>
          <Typography>TODOを削除します。よろしいですか</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={onDeleteClick}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};
