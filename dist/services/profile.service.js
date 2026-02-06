"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("@/db");
const schema_1 = require("@/db/schema");
class ProfileService {
    async getProfile(userId) {
        const [profile] = await db_1.db
            .select()
            .from(schema_1.profiles)
            .where((0, drizzle_orm_1.eq)(schema_1.profiles.userId, userId));
        if (!profile)
            return null;
        return profile;
    }
    async saveProfile(profileData, userId) {
        await db_1.db.insert(schema_1.profiles).values({
            userId,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            phoneNumber: profileData.phoneNumber,
            address: profileData.address,
            birthDate: profileData.birthDate,
            gender: profileData.gender,
        });
    }
    async updateProfile(profileData, userId) {
        await db_1.db
            .update(schema_1.profiles)
            .set({
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            phoneNumber: profileData.phoneNumber,
            address: profileData.address,
            birthDate: profileData.birthDate,
            gender: profileData.gender,
        })
            .where((0, drizzle_orm_1.eq)(schema_1.profiles.userId, userId));
    }
    async deleteProfile(userId) {
        await db_1.db.delete(schema_1.profiles).where((0, drizzle_orm_1.eq)(schema_1.profiles.userId, userId));
    }
}
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map