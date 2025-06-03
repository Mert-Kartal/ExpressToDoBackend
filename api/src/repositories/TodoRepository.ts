import prisma from "../config/db";
import { CreateTodoData, UpdateTodoData, TodoData } from "../types/todoType";

export class TodoRepository {
  async getTodos(): Promise<TodoData[]> {
    try {
      return await prisma.todo.findMany({ where: { deletedAt: null } });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getTodo(id: string): Promise<TodoData | null> {
    try {
      return await prisma.todo.findUnique({
        where: {
          id,
          deletedAt: null,
        },
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async createTodo(data: CreateTodoData): Promise<TodoData> {
    try {
      return await prisma.todo.create({
        data,
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async updateTodo(id: string, data: UpdateTodoData): Promise<TodoData> {
    try {
      return await prisma.todo.update({
        where: {
          id,
          deletedAt: null,
        },
        data,
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deleteTodo(id: string): Promise<TodoData> {
    try {
      return await prisma.todo.update({
        where: {
          id,
        },
        data: {
          deletedAt: new Date(),
        },
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
