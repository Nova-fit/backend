import type { User } from '@/model/types';
import type { IDatabase, DatabaseStats, IDatabaseInitializer } from '@/interfaces/database.interface';
declare abstract class BaseDatabase implements IDatabase {
    abstract createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
    abstract findUserByEmail(email: string): Promise<User | null>;
    abstract findUserById(id: string): Promise<User | null>;
    abstract updateUser(id: string, updates: Partial<User>): Promise<User | null>;
    abstract deleteUser(id: string): Promise<boolean>;
    abstract getAllUsers(): Promise<User[]>;
    abstract getUserCount(): Promise<number>;
    abstract saveRefreshToken(token: string): Promise<void>;
    abstract isRefreshTokenValid(token: string): Promise<boolean>;
    abstract removeRefreshToken(token: string): Promise<void>;
    abstract removeAllRefreshTokensForUser(userId: string): Promise<void>;
    abstract getRefreshTokenCount(): Promise<number>;
    abstract clearAll(): Promise<void>;
    abstract getStats(): Promise<DatabaseStats>;
}
declare class InMemoryDatabase extends BaseDatabase implements IDatabaseInitializer {
    private users;
    private refreshTokens;
    createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(id: string): Promise<User | null>;
    updateUser(id: string, updates: Partial<User>): Promise<User | null>;
    deleteUser(id: string): Promise<boolean>;
    getAllUsers(): Promise<User[]>;
    saveRefreshToken(token: string): Promise<void>;
    isRefreshTokenValid(token: string): Promise<boolean>;
    removeRefreshToken(token: string): Promise<void>;
    removeAllRefreshTokensForUser(userId: string): Promise<void>;
    getUserCount(): Promise<number>;
    getRefreshTokenCount(): Promise<number>;
    clearAll(): Promise<void>;
    getStats(): Promise<DatabaseStats>;
}
export { BaseDatabase, InMemoryDatabase };
export declare const db: InMemoryDatabase;
export declare function initializeDatabase(): Promise<void>;
//# sourceMappingURL=database.d.ts.map