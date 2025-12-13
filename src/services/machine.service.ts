import { db } from "@/db";
import { Machine, machines, NewMachine } from "@/db/schema";
import { IMachineService } from "@/model";
import { eq, or } from "drizzle-orm";

export class MachineService implements IMachineService {
  async create(data: NewMachine): Promise<Machine> {
    const [created] = await db.insert(machines).values(data).returning();
    return created as Machine;
  }

  async findAll(filters: Partial<Machine> = {}): Promise<Machine[]> {
    return db
      .select()
      .from(machines)
      .where(
        or(
          filters.id ? eq(machines.id, filters.id) : undefined,
          filters.branchId ? eq(machines.branchId, filters.branchId) : undefined,
          filters.name ? eq(machines.name, filters.name) : undefined,
          filters.serialNumber ? eq(machines.serialNumber, filters.serialNumber) : undefined,
          filters.brand ? eq(machines.brand, filters.brand) : undefined,
          filters.model ? eq(machines.model, filters.model) : undefined,
          filters.category ? eq(machines.category, filters.category) : undefined,
          filters.status ? eq(machines.status, filters.status) : undefined
        )
      );
  }

  async findById(id: number): Promise<Machine | null> {
    const result = await db
      .select()
      .from(machines)
      .where(eq(machines.id, id))
      .limit(1);

    return result[0] || null;
  }

  async update(id: number, data: Partial<Machine>): Promise<Machine> {
    const [updated] = await db
      .update(machines)
      .set(data)
      .where(eq(machines.id, id))
      .returning();
    return updated as Machine;
  }

  async delete(id: number): Promise<void> {
    await db.delete(machines).where(eq(machines.id, id));
  }
}
