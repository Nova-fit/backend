import { NewOrganization, Organization } from "@/db/schema";

export interface IOrganizationServices {
  createOrganization({
    newOrganization,
  }: {
    newOrganization: NewOrganization;
  }): Promise<Organization>;

  updateOrganization({ id }: { id: number }): Promise<Organization>;

  deleteOrganization({
    organization,
  }: {
    organization: Organization;
  }): Promise<void>;

  getOrganization({ name }: { name: string }): Promise<Organization>;
}
