import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import TodoListItem from './TodoListItem';
import { TodoResponse } from '../../api/todo';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

type TodoListProps = {
  title: string;
  todos: Array<TodoResponse>;
};

const TodoList: React.FC<TodoListProps> = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" className={classes.title}>
        {props.title}
      </Typography>
      <List className={classes.root} dense>
        {props.todos.map((todo: TodoResponse, index: number) => {
          const labelId = `checkbox-list-label-${index}`;
          return (
            <TodoListItem todo={todo} id={labelId} key={index} />
          );
        })}
      </List>
    </React.Fragment>
  );
};

export default TodoList;
