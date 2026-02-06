import { Profile, NewProfile } from "@/db/schema";
export interface IProfileService {
    getProfile(userId: string): Promise<Profile | null>;
    saveProfile(profileData: NewProfile, userId: string): Promise<void>;
    updateProfile(profileData: NewProfile, userId: string): Promise<void>;
    deleteProfile(userId: string): Promise<void>;
}
//# sourceMappingURL=profile-services.interface.d.ts.map