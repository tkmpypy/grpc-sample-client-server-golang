import React from 'react';
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { TodoResponse, updateTodo, UpdateTodoRequest } from '../../api/todo';
import { todoItemByID, todoListState, doneListState, todoRefreshState } from '../../states/todo/state';

type TodoListItemProps = {
  todo: TodoResponse;
  id: string;
};

const TodoListItem: React.FC<TodoListItemProps> = (props) => {
  const todo = useRecoilValue(todoItemByID(props.todo.todoId));
  const [todoList] = useRecoilState(todoListState);
  const [doneList] = useRecoilState(doneListState);
  const setTodoRefresh = useSetRecoilState(todoRefreshState);

  const handleChange = () => async () => {
    let idx, copyList;
    if (todo?.done) {
      idx = doneList.findIndex((v) => v.todoId === todo?.todoId);
      copyList = [...doneList];
    } else  {
      idx = todoList.findIndex((v) => v.todoId === todo?.todoId);
      copyList = [...todoList];
    }
    copyList[idx] = {
      ...todo!,
      done: !todo?.done,
    };

    const param = {
      todoId: copyList[idx].todoId,
      value: copyList[idx].value,
      done: copyList[idx].done,
    } as UpdateTodoRequest;
    await updateTodo(param);

    setTodoRefresh("ALL")
  };

  return (
    <ListItem
      key={todo?.value}
      role={undefined}
      dense
      button
      disabled={todo?.done}
      onClick={handleChange()}
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo?.done}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': props.id }}
        />
      </ListItemIcon>
      <ListItemText id={props.id} primary={todo?.value} />
    </ListItem>
  );
};

export default TodoListItem;
