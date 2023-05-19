import { getTodo, updateTodo } from "@/api/todoRepository";
import { Todo } from "@/types/types";
import Checkbox from "@mui/material/Checkbox";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDispatch } from "react-redux";
import { updateTodoInState } from "@/features/todoSlice";
import Link from "next/link";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ActionIconButton from "@/components/ActionIconButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { TodoDialog } from "@/components/TodoDialog";
import { formatDate } from "@/utils/formatDate";
import { DeleteDialog } from "@/components/deleteDialog";

const TodoDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [todo, setTodo] = useState<Todo | null>(null);
  const dispatch = useDispatch();

  const onChangeClick = (todo: Todo) => {
    const newTodo = { ...todo, completed: !todo.completed };
    updateTodo(newTodo)
      .then((success) => {
        if (success && typeof id === "string") {
          getTodo(id)
            .then((updatedTodo) => {
              dispatch(updateTodoInState(updatedTodo));
              setTodo(updatedTodo);
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          throw new Error("更新に失敗しました。");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [editTodoInputOpen, setEditTodoInputOpen] = useState(false);
  const handleClickEditOpen = () => {
    setEditTodoInputOpen(true);
  };
  const handleEditClose = () => {
    setEditTodoInputOpen(false);
  };

  const [deleteTodoInputOpen, setDeleteTodoInputOpen] = useState(false);
  const handleClickDeleteOpen = () => {
    setDeleteTodoInputOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteTodoInputOpen(false);
  };

  useEffect(() => {
    if (typeof id === "string") {
      getTodo(id).then((fetchedTodo) => setTodo(fetchedTodo));
    }
  }, [id]);

  if (!todo) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box sx={{ position: "fixed", top: "30px", left: "60px" }}>
        <Link href="/" passHref>
          <Box display="flex" alignItems="center" sx={{ columnGap: "18px" }}>
            <ArrowBackIosNewIcon color="primary" sx={{ fontSize: "14px" }} />
            <Typography
              component="span"
              color="primary"
              fontSize="14px"
              sx={{ lineHeight: "0" }}
            >
              一覧にもどる
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"flex-end"}
        sx={{ columnGap: "12px", mt: "48px" }}
      >
        <ActionIconButton
          icon={ModeEditOutlineIcon}
          label="TODOを編集"
          onClick={handleClickEditOpen}
        />
        <TodoDialog
          open={editTodoInputOpen}
          onClose={handleEditClose}
          onSave={() => {
            handleEditClose();
            if (typeof id === "string") {
              getTodo(id).then((fetchedTodo) => setTodo(fetchedTodo));
            }
          }}
          isEditing={true}
          editingTodo={todo}
        />
        <ActionIconButton
          icon={DeleteOutlineIcon}
          color="error"
          label="TODOを削除"
          onClick={handleClickDeleteOpen}
        />
        <DeleteDialog
          open={deleteTodoInputOpen}
          onClose={handleDeleteClose}
          todo={todo}
        />
      </Box>
      <Card sx={{ mt: "24px", boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.25)" }}>
        <CardContent>
          <Box display="flex" alignItems="center">
            <Checkbox
              color="primary"
              checked={todo.completed}
              onChange={() => onChangeClick(todo)}
              sx={{
                color: "#757575",
              }}
            />
            <Typography
              component="h1"
              sx={{ marginLeft: "10px", fontSize: "18px" }}
            >
              {todo.title}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            sx={{ paddingLeft: "10px", marginTop: "14px" }}
          >
            <AccessTimeIcon color="disabled" fontSize="small" />
            <Typography
              color="text.disabled"
              sx={{ marginLeft: "5px", fontSize: "12px" }}
            >
              {formatDate(todo.dueDate as string)}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Typography component={"p"} sx={{ fontSize: "16px" }}>
            {todo.description}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default TodoDetail;
