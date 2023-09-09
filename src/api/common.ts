export class APIError extends Error {
  code;
  message;

  constructor(code: number, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAPIError = (data: any): data is APIError => {
  return 'code' in data && 'message' in data;
};
