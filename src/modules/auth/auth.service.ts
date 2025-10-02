import bcrypt from 'bcrypt';
import type { AuthLogin, AuthRegister } from './auth.type.ts';
import { loginRepository, registerRepository } from './auth.repository.ts';
import { badRequest, created, success, WebResponse } from '@/utils/WebResponse.ts';

const response = WebResponse;

export const loginService = async (data: AuthLogin) => {
  // Ambil user dari DB berdasarkan email
  const user = await loginRepository(data); // misal return-nya: { id, email, passwordHash, ... }

  if (!user) {
    return response(badRequest, 'Login failed: user not found', null);
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    return response(badRequest, 'Login failed: invalid password', null);
  }
  const result = {
    id: user.id,
    email: user.email,
  }

  return response(success, 'Login success', result);
};

export const registerService = async (data: AuthRegister) => {
  // Hash password sebelum disimpan
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = {
    ...data,
    password: hashedPassword,
  };

  const user = await registerRepository(newUser);

  if (!user) {
    return response(badRequest, 'Register failed', null);
  }

  const result = {
    email: data.email,
    phone: data.phone,
  }

  return response(created, 'Register success', result);
};
