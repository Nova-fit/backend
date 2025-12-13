import { Machine, NewMachine } from "@/db/schema";

export interface IMachineService {
  create(data: NewMachine): Promise<Machine>;
  findAll(filters?: Partial<Machine>): Promise<Machine[]>;
  findById(id: number): Promise<Machine | null>;
  update(id: number, data: Partial<Machine>): Promise<Machine>;
  delete(id: number): Promise<void>;
}
