import {
  Box,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Fragment, useEffect, useState } from "react";
import { getAllTodos, updateTodo } from "../api/todoRepository";
import { formatDate } from "@/utils/formatDate";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setTodos } from "@/features/todoSlice";
import { TodoDialog } from "@/components/TodoDialog";
import { Todo } from "@/types/types";
import Link from "next/link";
import ActionIconButton from "@/components/ActionIconButton";



export default function Index() {
  const theme = useTheme();

  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const sortedTodos = [...todos].sort((a, b) => {
    const aDate = a.dueDate ? new Date(a.dueDate).getTime() : 0;
    const bDate = b.dueDate ? new Date(b.dueDate).getTime() : 0;
    return aDate - bDate;
  });

  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getAllTodos();
      dispatch(setTodos(data));
    };
    fetchTodos();
  }, [dispatch]);

  const handleTodoClick = (selectedTodo: Todo) => {
    const newTodo = { ...selectedTodo, completed: !selectedTodo.completed };
    updateTodo(newTodo)
      .then((success) => {
        if (success) {
          return getAllTodos();
        } else {
          throw new Error("更新に失敗しました");
        }
      })
      .then((updatedTodos) => {
        dispatch(setTodos(updatedTodos));
      })
      .catch((error) => {
        console.error("エラーが発生しました：" + error);
      });
  };

  const getCompletedTodoPercentage = () => {
    const totalTodos = todos.length;
    if (totalTodos === 0) {
      return 0;
    }
    const completedTodos = todos.filter((todo) => todo.completed).length;
    return (completedTodos / totalTodos) * 100;
  };

  const [createTodoInputOpen, setCreateTodoInputOpen] = useState(false);
  const handleClickOpen = () => {
    setCreateTodoInputOpen(true);
  };
  const handleClose = () => {
    setCreateTodoInputOpen(false);
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <ActionIconButton
          icon={AddCircleIcon}
          label="TOTOを作成"
          onClick={handleClickOpen}
        />
        <TodoDialog
          open={createTodoInputOpen}
          onClose={handleClose}
          onSave={handleClose}
          isEditing={false}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "4px",
          boxShadow: theme.shadows[3],
          marginTop: "24px",
        }}
      >
        <LinearProgress
          variant="determinate"
          value={getCompletedTodoPercentage()}
          sx={{
            height: "8px",
          }}
        />
        <List sx={{ paddingBottom: "0px", paddingTop: "0px" }}>
          {sortedTodos.length === 0 ? (
            <ListItem>
              <ListItemText
                primaryTypographyProps={{
                  variant: "body2",
                  style: {
                    color: theme.palette.text.disabled,
                    textAlign: "center",
                    paddingTop: "24px",
                    paddingBottom: "24px",
                  },
                }}
              >
                TODOはまだありません
              </ListItemText>
            </ListItem>
          ) : (
            sortedTodos.map((todo) => {
              return (
                <Fragment key={todo.id}>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="comments">
                        <Link href={`todo/${todo.id}`}>
                          <ArrowForwardIosIcon color="primary" />
                        </Link>
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={() => handleTodoClick(todo)}
                      dense
                      sx={{
                        alignItems: "flex-start",
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: "42px" }}>
                        <Checkbox
                          edge="start"
                          checked={todo.completed}
                          onClick={() => handleTodoClick(todo)}
                          tabIndex={-1}
                          disableRipple
                          sx={{
                            color: "#757575",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primaryTypographyProps={{ variant: "h6" }}
                        secondaryTypographyProps={{
                          variant: "body2",
                          style: {
                            color: theme.palette.text.disabled,
                          },
                        }}
                        primary={todo.title}
                        secondary={formatDate(todo.dueDate as string)}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="middle" />
                </Fragment>
              );
            })
          )}
        </List>
      </Box>
    </>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   if (!basicAuth(context.req, context.res)) {
//     return { props: {} };
//   }

//   // ここで通常のgetServerSidePropsの処理を行う
//   // ...

//   return {
//     props: {
//       // ページのプロパティを返す
//     },
//   };
// };