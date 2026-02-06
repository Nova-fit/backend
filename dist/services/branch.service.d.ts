import { NewBranch, Branch, NewBranchSchedule } from "@/db/schema";
import { BranchServices } from "@/model";
export declare class BranchServiceImpl implements BranchServices {
    create(branch: NewBranch): Promise<Branch>;
    findAll(filters?: Partial<Branch>): Promise<Branch[]>;
    findById(id: number): Promise<Branch | null>;
    update(id: number, data: Branch): Promise<Branch>;
    delete(id: number): Promise<void>;
    createBranchSchedule(data: NewBranchSchedule): Promise<{
        id: number;
        branchId: number;
        dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
        openTime: string;
        closeTime: string;
        isClosed: boolean;
    }>;
    getBranchSchedule(id: number): Promise<{
        id: number;
        branchId: number;
        dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
        openTime: string;
        closeTime: string;
        isClosed: boolean;
    } | null>;
    updateBranchSchedule(id: number, data: NewBranchSchedule): Promise<{
        id: number;
        branchId: number;
        dayOfWeek: "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday";
        openTime: string;
        closeTime: string;
        isClosed: boolean;
    }>;
    deleteBranchSchedule(id: number): Promise<void>;
}
//# sourceMappingURL=branch.service.d.ts.map