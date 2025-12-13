import { db } from "@/db";
import {
  NewBranch,
  Branch,
  branches,
  NewBranchSchedule,
  BranchSchedule,
  branchSchedules,
} from "@/db/schema";
import { BranchServices } from "@/model";
import { eq, or } from "drizzle-orm";

export class BranchServiceImpl implements BranchServices {
  async create(branch: NewBranch): Promise<Branch> {
    const [created] = await db.insert(branches).values(branch).returning();
    return created as Branch;
  }

  async findAll(filters: Partial<Branch> = {}): Promise<Branch[]> {
    return db
      .select()
      .from(branches)
      .where(
        or(
          eq(branches.id, filters?.id!),
          eq(branches.name, filters?.name!),
          eq(branches.address, filters?.address!),
          eq(branches.email, filters?.email!),
          eq(branches.createdAt, filters?.createdAt!),
          eq(branches.updatedAt, filters?.updatedAt!),
        ),
      );
  }

  async findById(id: number): Promise<Branch | null> {
    const branch = await db
      .select()
      .from(branches)
      .where(eq(branches.id, id))
      .limit(1)
      .execute();

    return branch[0] || null;
  }

  async update(id: number, data: Branch): Promise<Branch> {
    const [updated] = await db
      .update(branches)
      .set(data)
      .where(eq(branches.id, id))
      .returning();
    return updated as Branch;
  }

  async delete(id: number): Promise<void> {
    await db.delete(branches).where(eq(branches.id, id));
  }

  async createBranchSchedule(data: NewBranchSchedule) {
    const [created] = await db.insert(branchSchedules).values(data).returning();
    return created as BranchSchedule;
  }

  async getBranchSchedule(id: number) {
    const schedule = await db
      .select()
      .from(branchSchedules)
      .where(eq(branchSchedules.branchId, id))
      .execute();

    return schedule[0] || null;
  }

  async updateBranchSchedule(id: number, data: NewBranchSchedule) {
    const [updated] = await db
      .update(branchSchedules)
      .set(data)
      .where(eq(branchSchedules.id, id))
      .returning();
    return updated as BranchSchedule;
  }

  async deleteBranchSchedule(id: number) {
    await db.delete(branchSchedules).where(eq(branchSchedules.id, id));
  }
}
