import {atom, selectorFamily} from 'recoil';
import { AddTodoRequest, getTodos, addTodo, GetTodosRequestParams, TodoResponse } from '../../api/todo';

export const todoListState = atom<Array<TodoResponse>>({
  key: 'todoListState',
  default: [],
});
export const doneListState = atom<Array<TodoResponse>>({
  key: 'doneListState',
  default: [],
});

export const todoCurrentInputState = atom<string>({
  key: 'todoCurrentInputState',
  default: "",
});

export const todoRefreshState = atom<"ALL" | "TODO" | "DONE" | "NONE">({
  key: 'todoRefreshState',
  default: "NONE",
});

export const todoItemByID = selectorFamily({
  key: 'todoItemByID',
  get: (todoId: string) => ({get}) => {
    const todoList = get(todoListState);
    const doneList = get(doneListState);
    const merged = todoList.concat(doneList);
    return merged.find((v) => v.todoId === todoId);
  },
});
