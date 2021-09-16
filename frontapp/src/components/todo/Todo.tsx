import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TodoList from './TodoList';
import {
  todoListState,
  todoCurrentInputState,
  doneListState,
  todoRefreshState,
} from '../../states/todo/state';
import { useRecoilState, useRecoilValue } from 'recoil';
import { addTodo, getTodos } from '../../api/todo';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    overflowWrap: 'break-word',
  },
}));

const Todo: React.FC = () => {
  const classes = useStyles();
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const [doneList, setDoneList] = useRecoilState(doneListState);
  const [todoRefresh, setTodoRefresh] = useRecoilState(todoRefreshState);
  const [todoCurrentInput, setTodoCurrentInput] = useRecoilState(
    todoCurrentInputState
  );

  const fetchAllTodo = async () => {
    const allTodos = await getTodos({
      limit: 0,
      page: 0,
      done: null
    });
    const todos = allTodos.todos.filter((t) => !t.done);
    const dones = allTodos.todos.filter((t) => t.done);
    setTodoList(todos);
    setDoneList(dones);
  };

  const fetchTodo = async () => {
    const todo = await getTodos({
      limit: 0,
      page: 0,
      done: false,
    });
    setTodoList(todo.todos);
  }

  const fetchDone = async () => {
    const done = await getTodos({
      limit: 0,
      page: 0,
      done: true,
    });
    setDoneList(done.todos);
  }

  const onEnter = async (_e: React.KeyboardEvent<HTMLDivElement>) => {
    await addTodo({
      value: todoCurrentInput,
      done: false,
    });
    setTodoCurrentInput("");
    setTodoRefresh("TODO");
  };

  const onChangeInputTodo = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setTodoCurrentInput(e.target.value);
  };

  useEffect(() => {
    fetchAllTodo();
  }, []);

  useEffect(() => {
    if (todoRefresh === "ALL") {
      fetchAllTodo();
    } else if (todoRefresh === "DONE") {
      fetchDone();
    } else if (todoRefresh === "TODO"){
      fetchTodo();
    }
    setTodoRefresh("NONE");
  }, [todoRefresh]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className={classes.content}>
            <TextField
              id="input-task"
              label="Add task"
              placeholder="input your task."
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              onKeyPress={(e) => {
                if (e.code === 'Enter') {
                  onEnter(e);
                }
              }}
              value={todoCurrentInput}
              onChange={onChangeInputTodo}
            />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.content}>
            <TodoList title={'Todos'} todos={todoList} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={classes.content}>
            <TodoList title={'Done'} todos={doneList} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Todo;
