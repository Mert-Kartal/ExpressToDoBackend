import prisma from "../config/db";
import { CreateTodoData, UpdateTodoData, TodoData } from "../model/todoType";

export class TodoRepository {
  static async getTodos(): Promise<TodoData[]> {
    return await prisma.todo.findMany({ where: { deletedAt: null } });
  }

  static async getTodo(id: string): Promise<TodoData | null> {
    return await prisma.todo.findUnique({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  static async createTodo(data: CreateTodoData): Promise<TodoData> {
    return await prisma.todo.create({
      data,
    });
  }

  static async updateTodo(id: string, data: UpdateTodoData): Promise<TodoData> {
    return await prisma.todo.update({
      where: {
        id,
        deletedAt: null,
      },
      data,
    });
  }

  static async deleteTodo(id: string): Promise<TodoData> {
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
