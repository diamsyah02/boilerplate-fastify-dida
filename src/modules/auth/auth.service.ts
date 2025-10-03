import bcrypt from 'bcrypt';
import type { AuthLogin, AuthRegister } from './auth.type.js';
import { loginRepository, registerRepository } from './auth.repository.js';
import { badRequest, created, success, WebResponse } from '../../utils/WebResponse.js';

const response = WebResponse;

export const loginService = async (data: AuthLogin) => {
  try {
    // Ambil user dari DB berdasarkan email
    const user = await loginRepository(data); // misal return-nya: { id, email, passwordHash, ... }

    if (!user) {
      return response(badRequest, 'Login failed: user not found', null, null);
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      return response(badRequest, 'Login failed: invalid password', null, null);
    }
    
    const result = {
      id: user.id,
      email: user.email,
    }

    return response(success, 'Login success', null, result);
  } catch (err) {
    return response(badRequest, 'Login failed: invalid data', err, null);
  }
};

export const registerService = async (data: AuthRegister) => {
  try {
    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = {
      ...data,
      password: hashedPassword,
    };

    const user = await registerRepository(newUser);

    if (!user) {
      return response(badRequest, 'Register failed', null, null);
    }

    const result = {
      email: data.email,
      phone: data.phone,
    }

    return response(created, 'Register success', null, result);
  } catch (err) {
    return response(badRequest, 'Register failed: invalid data', err, null);
  }
};
