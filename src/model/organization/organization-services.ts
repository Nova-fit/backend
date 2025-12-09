import { NewOrganization, Organization } from "@/db/schema";

export interface IOrganizationServices {
  createOrganization({
    newOrganization,
  }: {
    newOrganization: NewOrganization;
  }): Promise<Organization>;

  updateOrganization({ id }: { id: number }): Promise<Organization>;

  deleteOrganization({ id }: { id: number }): Promise<void>;

  getOrganization({ id }: { id: number }): Promise<Organization>;
}
