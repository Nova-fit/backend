import { eq } from "drizzle-orm";
import { db } from "@/db";
import { profiles } from "@/db/schema";
import { IProfileInsert } from "@/types/profile.type";

export class ProfileService {
  async getProfile(userId: string) {
    const [profile] = await db
      .select()
      .from(profiles)
          .where(eq(profiles.userId, userId));
          
    if (!profile) return null;
      
    return profile;
    }
    
    async saveProfile(profileData: IProfileInsert, userId: string) {
      await db.insert(profiles)
      .values({
        userId,
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phoneNumber: profileData.phoneNumber,
        address: profileData.address,
        birthDate: profileData.birthDate,
        gender: profileData.gender,
      })
    }

    async updateProfile(profileData: IProfileInsert, userId: string) {
      await db.update(profiles)
      .set({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        phoneNumber: profileData.phoneNumber,
        address: profileData.address,
        birthDate: profileData.birthDate,
        gender: profileData.gender,
      })
      .where(eq(profiles.userId, userId));
    }

    async deleteProfile(userId: string) {
      await db.delete(profiles)
      .where(eq(profiles.userId, userId));
    }
}
