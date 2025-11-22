import { IProfile } from "@/db/schema";
import { IProfileInsert } from "@/types/profile.type";

export interface IProfileService {
    getProfile(userId: string): Promise<typeof IProfile | null>;
    saveProfile(profileData: IProfileInsert, userId: string): Promise<void>;
    updateProfile(profileData: IProfileInsert, userId: string): Promise<void>;
    deleteProfile(userId: string): Promise<void>;
}