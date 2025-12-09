import { db } from "@/db";
import { NewOrganization, Organization, organizations } from "@/db/schema";
import { IOrganizationServices } from "@/model/organization/organization-services";
import { eq } from "drizzle-orm";

export class OrganizationService implements IOrganizationServices {
  async createOrganization({
    newOrganization,
  }: {
    newOrganization: NewOrganization;
  }): Promise<Organization> {
    if (!newOrganization) {
      throw new Error("Organization ID is required");
    }

    const existingOrganization = await this.validateById(newOrganization.id!);

    if (existingOrganization) {
      throw new Error("Organization already exists");
    }

    const [organization] = await db
      .insert(organizations)
      .values(newOrganization)
      .returning();

    if (!organization) {
      throw new Error("Failed to create organization");
    }

    return organization;
  }

  async updateOrganization({ id }: { id: number }): Promise<Organization> {
    const existingOrganization = await this.validateById(id);

    if (!existingOrganization) {
      throw new Error("Organization not found");
    }

    const [updatedOrganization] = await db
      .update(organizations)
      .set(existingOrganization)
      .where(eq(organizations.id, existingOrganization.id))
      .returning();

    if (!updatedOrganization) {
      throw new Error("Failed to update organization");
    }

    return updatedOrganization;
  }

  async deleteOrganization({ id }: { id: number }): Promise<void> {
    const existingOrganization = await this.validateById(id);

    if (!existingOrganization) {
      throw new Error("Organization not found");
    }

    await db
      .delete(organizations)
      .where(eq(organizations.id, existingOrganization.id))
      .execute();
  }

  async getOrganization({ id }: { id: number }): Promise<Organization> {
    const existingOrganization = await this.validateById(id);

    if (!existingOrganization) {
      throw new Error("Organization not found");
    }

    return existingOrganization;
  }

  private async validateById(id: number): Promise<Organization | null> {
    const [existingOrganization] = await db
      .select()
      .from(organizations)
      .where(eq(organizations.id, id))
      .execute();

    if (!existingOrganization) {
      return null;
    }

    return existingOrganization!;
  }
}
