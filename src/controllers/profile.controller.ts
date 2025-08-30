import { Context } from "hono";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { IProfileInsert } from "@/types/profile.type";
import { JWTPayload } from "@/types";

const getProfile = async (c: Context) => {
  const payload = c.get("jwtPayload");
  const [profile] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, payload.userId));
  if (!profile) return c.json({ error: "Profile not found" }, 404);

  return c.json({ profile }, 200);
};

const saveProfile = async (c: Context) => {
  const payload: JWTPayload = c.get("jwtPayload");

 try {
   
    const profileData = (await c.req.json()) as IProfileInsert;

  await db.insert(profiles)
    .values({
      userId: payload.userId,
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      phoneNumber: profileData.phoneNumber,
      address: profileData.address,
      birthDate: profileData.birthDate,
      gender: profileData.gender,
    })
  
   return c.json({  }, 200);
  } catch (error) {
    return c.json({ error: "Error al guardar en BD" }, 500);
  }
};

const updateProfile = async (c: Context) => {
  const body = (await c.req.json()) as IProfileInsert;

  try {
    const payload = c.get("jwtPayload");

    const [nuevoPerfil] = await db
      .update(profiles)
      .set({
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        address: body.address,
        birthDate: body.birthDate,
        gender: body.gender,
      })
      .where(eq(profiles.userId, payload.userId))
      .returning();
    return c.json({ message: "Perfil creado" }, 201);
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
    await db.delete(profiles).where(eq(profiles.userId, userId));
    return c.json({ message: "Su perfil fue eliminado exitosamente" }, 201);
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
