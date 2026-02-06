import { NewProfile, Profile } from "@/db/schema";
import { IProfileService } from "@/model/profile/profile-services.interface";
export declare class ProfileService implements IProfileService {
    getProfile(userId: string): Promise<Profile | null>;
    saveProfile(profileData: NewProfile, userId: string): Promise<void>;
    updateProfile(profileData: NewProfile, userId: string): Promise<void>;
    deleteProfile(userId: string): Promise<void>;
}
//# sourceMappingURL=profile.service.d.ts.map