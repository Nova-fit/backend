import { Branch, NewBranch, BranchSchedule, NewBranchSchedule } from "@/db/schema";
export interface BranchServices {
    create(branch: NewBranch): Promise<Branch>;
    findAll(filters?: Partial<Branch>): Promise<Branch[]>;
    findById(id: number): Promise<Branch | null>;
    update(id: number, data: Branch): Promise<Branch>;
    delete(id: number): Promise<void>;
    createBranchSchedule(data: NewBranchSchedule): Promise<BranchSchedule>;
    getBranchSchedule(id: number): Promise<BranchSchedule | null>;
    updateBranchSchedule(id: number, data: NewBranchSchedule): Promise<BranchSchedule>;
    deleteBranchSchedule(id: number): Promise<void>;
}
//# sourceMappingURL=branch-services.interface.d.ts.map