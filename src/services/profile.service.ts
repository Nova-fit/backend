import { eq } from "drizzle-orm";
import { db } from "@/db";
import { NewProfile, Profile, profiles } from "@/db/schema";
import { IProfileService } from "@/model/profile/profile-services.interface";

export class ProfileService implements IProfileService {
  async getProfile(userId: string): Promise<Profile | null> {
    const [profile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.userId, userId));

    if (!profile) return null;

    return profile;
  }

  async saveProfile(profileData: NewProfile, userId: string) {
    await db.insert(profiles).values({
      userId,
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      phoneNumber: profileData.phoneNumber,
      address: profileData.address,
      birthDate: profileData.birthDate,
      gender: profileData.gender,
    });
  }

  async updateProfile(profileData: NewProfile, userId: string) {
    await db
      .update(profiles)
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
    await db.delete(profiles).where(eq(profiles.userId, userId));
  }
}
