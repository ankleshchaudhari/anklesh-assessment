import bcrypt from 'bcrypt';
import prisma from '../prisma';
import { CustomError } from '../utils/customError.util';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.util';

export const registerUser = async (email: string, passwordRaw: string) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new CustomError('User already exists', 400);
  }

  const hashedPassword = await bcrypt.hash(passwordRaw, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return { id: user.id, email: user.email };
};

export const loginUser = async (email: string, passwordRaw: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new CustomError('Invalid credentials', 400);
  }

  const isPasswordValid = await bcrypt.compare(passwordRaw, user.password);
  if (!isPasswordValid) {
    throw new CustomError('Invalid credentials', 400);
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return { accessToken, refreshToken, user: { id: user.id, email: user.email } };
};

export const logoutUser = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: { refreshToken: null },
  });
};

export const refreshAuthToken = async (token: string) => {
  const user = await prisma.user.findFirst({ where: { refreshToken: token } });
  if (!user) {
    throw new CustomError('Invalid refresh token', 401);
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return { accessToken, refreshToken };
};
