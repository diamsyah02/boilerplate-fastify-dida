import type { AuthLogin, AuthRegister } from "./auth.type.ts"
import { loginRepository, registerRepository } from "./auth.repository.ts"

export const loginService = (data: AuthLogin) => {
    const result = loginRepository(data)
    return result
}

export const registerService = (data: AuthRegister) => {
    const result = registerRepository(data)
    return result
}
