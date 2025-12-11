import { Branch, NewBranch } from "@/db/schema";

export interface BranchServices {
  create(branch: NewBranch): Promise<Branch>;
  findAll(filters?: Partial<Branch>): Promise<Branch[]>;
  findById(id: number): Promise<Branch | null>;
  update(id: number, data: Branch): Promise<Branch>;
  delete(id: number): Promise<void>;
}
