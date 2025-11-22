import { ProfileService } from "@/services/profile.service";
import { JWTPayload } from "@/types";
import { IProfileInsert } from "@/types/profile.type";
import { Context } from "hono";

const profileService = new ProfileService();

const getProfile = async (c: Context) => {
  const payload = c.get("jwtPayload");
  const profile = await profileService.getProfile(payload.userId);
  
  if (!profile) return c.json({ error: "Profile not found" }, 404);
  
  return c.json( profile , 200);
};

const saveProfile = async (c: Context) => {
  const payload: JWTPayload = c.get("jwtPayload");

 try {
   
    const profileData = (await c.req.json()) as IProfileInsert;

    await profileService.saveProfile(profileData, payload.userId);
  
   return c.json({  }, 200);
  } catch (error) {
    return c.json({ error: "Error al guardar en BD" }, 500);
  }
};

const updateProfile = async (c: Context) => {
  const body = (await c.req.json()) as IProfileInsert;

  try {
    const payload = c.get("jwtPayload");

    await profileService.updateProfile(body, payload.userId);
    return c.json({ message: "Perfil actualizado" }, 200);  
  } catch (dbError: any) {
    console.error("Error al guardar en BD:", dbError);

    return c.json(
      {
        success: false,
        error: "Error de base de datos",
        message: "No se pudo guardar el perfil. Intenta nuevamente.",
      },
      500
    );
  }
};

const deleteProfile = async (c: Context) => {
  const { userId } = c.get("jwtPayload");
  try {
    await profileService.deleteProfile(userId);
    return c.json({ message: "Su perfil fue eliminado exitosamente" }, 200);
  } catch (error) {
    return c.json(
      {
        success: false,
        error: "Error de base de datos",
        message: "No se pudo eliminar el perfil. Intenta nuevamente.",
      },
      404
    );
  }
};

export default {
  getProfile,
  updateProfile,
  deleteProfile,
  saveProfile,
};
