import prisma from '../prisma';
import { CustomError } from '../utils/customError.util';

export const createTask = async (userId: string, data: { title: string; description?: string; status?: string }) => {
  return prisma.task.create({
    data: {
      ...data,
      userId,
    },
  });
};

export const getTasks = async (userId: string, query: { page?: string; limit?: string; status?: string; title?: string }) => {
  const page = parseInt(query.page || '1', 10);
  const limit = parseInt(query.limit || '10', 10);
  const skip = (page - 1) * limit;

  const filters: any = { userId };

  if (query.status) {
    filters.status = query.status;
  }
  if (query.title) {
    filters.title = { contains: query.title };
  }

  const tasks = await prisma.task.findMany({
    where: filters,
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });

  const total = await prisma.task.count({ where: filters });

  return {
    data: tasks,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getTaskById = async (userId: string, taskId: string) => {
  const task = await prisma.task.findFirst({ where: { id: taskId, userId } });
  if (!task) {
    throw new CustomError('Task not found', 404);
  }
  return task;
};

export const updateTask = async (userId: string, taskId: string, data: any) => {
  const task = await prisma.task.findFirst({ where: { id: taskId, userId } });
  if (!task) {
    throw new CustomError('Task not found', 404);
  }

  return prisma.task.update({
    where: { id: taskId },
    data,
  });
};

export const deleteTask = async (userId: string, taskId: string) => {
  const task = await prisma.task.findFirst({ where: { id: taskId, userId } });
  if (!task) {
    throw new CustomError('Task not found', 404);
  }

  await prisma.task.delete({ where: { id: taskId } });
};

export const toggleTaskStatus = async (userId: string, taskId: string) => {
  const task = await prisma.task.findFirst({ where: { id: taskId, userId } });
  if (!task) {
    throw new CustomError('Task not found', 404);
  }

  const newStatus = task.status === 'completed' ? 'pending' : 'completed';

  return prisma.task.update({
    where: { id: taskId },
    data: { status: newStatus },
  });
};
