export type Result<T> = Error | Success<T>;

type Error = {
  status: "error";
  message: string;
};

type Success<T = any> = {
  status: "ok";
  data: T;
};

export function ok<T>(data: T): Success {
  return { "status": "ok", "data": data };
}

export function err(message: string): Error {
  return { status: "error", message: message };
}
