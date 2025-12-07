
import { IAuthServices, IProfileService } from "@/model";
import { AuthServices, ProfileService } from "@/services";
import { Context } from "hono"

export type Variables = {
    authService: IAuthServices,
    profileService: IProfileService
}

export const containerMiddleware = async (c: Context, next: Function) => {
    c.set('authService', new AuthServices())
    c.set('profileService', new ProfileService())
  await next()
};