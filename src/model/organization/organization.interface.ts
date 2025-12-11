import { NewOrganization, Organization } from "@/db/schema";

export interface IOrganizationServices {
  createOrganization({
    organization,
  }: {
    organization: NewOrganization;
  }): Promise<Organization>;

  updateOrganization({
    organization,
  }: {
    organization: Organization;
  }): Promise<Organization>;

  deleteOrganization({
    organization,
  }: {
    organization: Organization;
  }): Promise<void>;

  getOrganization({
    organization,
  }: {
    organization: Organization;
  }): Promise<Organization>;
}
