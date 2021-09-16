export const GATEWAY_BASE_URL = process.env.REACT_APP_GATEWAY_BASE_URL;

function fetchWrapper<T>(task: Promise<Response>): Promise<T> {
  return new Promise((resolve, reject) => {
    task
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((json) => {
              resolve(json);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default function fetcher<T = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  return fetchWrapper<T>(fetch(input, init))
}

export function createRequestBody(method: string, data: unknown): Record<string, unknown> {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },

    body: JSON.stringify(data)
  };
}
