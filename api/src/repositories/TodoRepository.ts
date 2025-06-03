import prisma from "../config/db";
import { CreateTodoData, UpdateTodoData, TodoData } from "../types/todoType";

export class TodoRepository {
  async getTodos(): Promise<TodoData[]> {
    return await prisma.todo.findMany({ where: { deletedAt: null } });
  }

  async getTodo(id: string): Promise<TodoData | null> {
    return await prisma.todo.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  async createTodo(data: CreateTodoData): Promise<TodoData> {
    return await prisma.todo.create({
      data,
    });
  }

  async updateTodo(id: string, data: UpdateTodoData): Promise<TodoData> {
    return await prisma.todo.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteTodo(id: string): Promise<TodoData> {
    return await prisma.todo.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
