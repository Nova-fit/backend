import { NewOrganization, Organization } from "@/db/schema";
import { JWTPayload } from "@/model";
import { IOrganizationServices } from "@/model/organization/organization-services";
export declare class OrganizationService implements IOrganizationServices {
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
    private validateById;
}
//# sourceMappingURL=organization.services.d.ts.map