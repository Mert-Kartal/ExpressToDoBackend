import prisma from "../config/db";
import { Status } from "@prisma/client";
import { CreateTodoData, UpdateTodoData, TodoData } from "../model/todoType";

export class TodoRepository {
  static async getTodos(userId: string): Promise<TodoData[]> {
    return await prisma.todo.findMany({
      where: {
        userId,
        deletedAt: null,
      },
    });
  }

  static async getTodo(id: string, userId: string): Promise<TodoData | null> {
    return await prisma.todo.findUnique({
      where: {
        id,
        userId,
        deletedAt: null,
      },
    });
  }

  static async createTodo(
    data: CreateTodoData & { userId: string }
  ): Promise<TodoData> {
    return await prisma.todo.create({
      data,
    });
  }

  static async updateTodo(
    id: string,
    data: UpdateTodoData,
    userId: string
  ): Promise<TodoData> {
    return await prisma.todo.update({
      where: {
        id,
        userId,
        deletedAt: null,
      },
      data,
    });
  }

  static async updateTodoStatus(
    id: string,
    status: Status,
    userId: string
  ): Promise<TodoData> {
    return await prisma.todo.update({
      where: {
        id,
        userId,
      },
      data: {
        status,
      },
    });
  }

  static async deleteTodo(id: string, userId: string): Promise<TodoData> {
    return await prisma.todo.update({
      where: {
        id,
        userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  static async searchTodos(query: string, userId: string): Promise<TodoData[]> {
    return await prisma.todo.findMany({
      where: {
        AND: [
          {
            title: {
              contains: query,
            },
          },
          {
            userId,
          },
        ],
        deletedAt: null,
      },
    });
  }

  static async getTodoStats(
    userId: string
  ): Promise<{ _count: { status: number } }> {
    return await prisma.todo.aggregate({
      where: {
        userId,
        deletedAt: null,
      },
      _count: {
        status: true,
      },
    });
  }

  static async getPriorityStats(
    userId: string
  ): Promise<{ _count: { priority: number } }> {
    return await prisma.todo.aggregate({
      where: {
        userId,
        deletedAt: null,
      },
      _count: {
        priority: true,
      },
    });
  }
}
