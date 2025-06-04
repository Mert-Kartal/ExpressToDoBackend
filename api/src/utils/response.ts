export const successResponse = (data: any, message?: string, meta?: any) => ({
  status: "success",
  message,
  data,
  ...(meta && { meta }),
});

export const errorResponse = (message: string, errors?: any[]) => ({
  status: "error",
  message,
  ...(errors && { errors }),
});
