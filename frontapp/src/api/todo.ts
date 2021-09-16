import fetcher, { createRequestBody, GATEWAY_BASE_URL } from './api';

export type GetTodosRequestParams = {
  done: boolean | null;
};

export type TodoResponse = {
  todoId: string;
  value: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
};

export type GetTodoResponse = {
  todo: TodoResponse;
};

export type GetTodosResponse = {
  todos: Array<TodoResponse>;
};

export type AddTodoRequest = {
  value: string;
  done: boolean;
};

export type AddTodoResponse = {
  todo: TodoResponse;
};

export type UpdateTodoRequest = {
  todoId: string;
  value: string;
  done: boolean;
};

export type UpdateTodoResponse = {
  tood: TodoResponse;
};

export async function getTodo(todoId: string): Promise<GetTodoResponse> {
  const url = `${GATEWAY_BASE_URL}/todos/${todoId}`;
  return fetcher<GetTodoResponse>(url);
}

export async function getTodos(
  req: GetTodosRequestParams
): Promise<GetTodosResponse> {
  let url;
  if (req.done !== null) {
    const p = {
      done: req.done.toString(),
    };
    const params = new URLSearchParams(p);
    url = `${GATEWAY_BASE_URL}/todos?${params}`;
  } else {
    url = `${GATEWAY_BASE_URL}/todos`;
  }
  return fetcher<GetTodosResponse>(url);
}

export async function addTodo(req: AddTodoRequest): Promise<AddTodoResponse> {
  const p = createRequestBody('POST', req);
  const url = `${GATEWAY_BASE_URL}/todos`;
  return fetcher<AddTodoResponse>(url, p);
}

export async function updateTodo(
  req: UpdateTodoRequest
): Promise<UpdateTodoResponse> {
  const url = `${GATEWAY_BASE_URL}/todos/${req.todoId}`;
  const p = createRequestBody('PATCH', {
    value: req.value,
    done: req.done,
  });
  return fetcher<UpdateTodoResponse>(url, p);
}
