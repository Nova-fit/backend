import { NewOrganization, Organization } from "@/db/schema";
import { JWTPayload } from "../types";
export interface IOrganizationServices {
    createOrganization({ newOrganization, userId, }: {
        newOrganization: NewOrganization;
        userId: string;
    }): Promise<Organization>;
    updateOrganization({ id }: {
        id: number;
    }): Promise<Organization>;
    deleteOrganization({ id }: {
        id: number;
    }): Promise<void>;
    getOrganization({ payload, }: {
        payload: JWTPayload;
    }): Promise<Organization | null>;
}
//# sourceMappingURL=organization-services.d.ts.map