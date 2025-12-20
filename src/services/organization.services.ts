import { db } from "@/db";
import {
  NewOrganization,
  Organization,
  organizations,
  users,
} from "@/db/schema";
import { JWTPayload } from "@/model";
import { IOrganizationServices } from "@/model/organization/organization-services";
import { eq } from "drizzle-orm";

export class OrganizationService implements IOrganizationServices {
  async createOrganization({
    newOrganization,
    userId,
  }: {
    newOrganization: NewOrganization;
    userId: string;
  }): Promise<Organization> {
    if (!newOrganization) {
      throw new Error("Organization ID is required");
    }

    const existingOrganization = await db.select().from(organizations);

    if (existingOrganization.length === 1) {
      throw new Error("Organization already exists");
    }

    newOrganization.userId = userId;

    console.log("newOrganization", newOrganization);

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

  async getOrganization({
    payload,
  }: {
    payload: JWTPayload;
  }): Promise<Organization | null> {
    const { userId } = payload;

    const [existingOrganization] = await db
      .select()
      .from(organizations)
      .where(eq(organizations.userId, userId))
      .execute();

    if (!existingOrganization) {
      return null;
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
