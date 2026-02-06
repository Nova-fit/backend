"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getProfile = async (c) => {
    const payload = c.get("jwtPayload");
    const profileService = c.get("profileService");
    const profile = await profileService.getProfile(payload.userId);
    if (!profile)
        return c.json({ error: "Profile not found" }, 404);
    return c.json(profile, 200);
};
const saveProfile = async (c) => {
    const payload = c.get("jwtPayload");
    const profileService = c.get("profileService");
    try {
        const profileData = (await c.req.json());
        await profileService.saveProfile(profileData, payload.userId);
        return c.json({}, 200);
    }
    catch (error) {
        return c.json({ error: "Error al guardar en BD" }, 500);
    }
};
const updateProfile = async (c) => {
    const body = (await c.req.json());
    try {
        const payload = c.get("jwtPayload");
        const profileService = c.get("profileService");
        await profileService.updateProfile(body, payload.userId);
        return c.json({ message: "Perfil actualizado" }, 200);
    }
    catch (dbError) {
        console.error("Error al guardar en BD:", dbError);
        return c.json({
            success: false,
            error: "Error de base de datos",
            message: "No se pudo guardar el perfil. Intenta nuevamente.",
        }, 500);
    }
};
const deleteProfile = async (c) => {
    const profileService = c.get("profileService");
    const { userId } = c.get("jwtPayload");
    try {
        await profileService.deleteProfile(userId);
        return c.json({ message: "Su perfil fue eliminado exitosamente" }, 200);
    }
    catch (error) {
        return c.json({
            success: false,
            error: "Error de base de datos",
            message: "No se pudo eliminar el perfil. Intenta nuevamente.",
        }, 404);
    }
};
exports.default = {
    getProfile,
    updateProfile,
    deleteProfile,
    saveProfile,
};
//# sourceMappingURL=profile.controller.js.map