import type { User } from '@/model/types'

export interface DatabaseStats {
  users: number
  refreshTokens: number
  lastUserCreated: Date | null
}

export interface IDatabase {
  createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>
  findUserByEmail(email: string): Promise<User | null>
  findUserById(id: string): Promise<User | null>
  updateUser(id: string, updates: Partial<User>): Promise<User | null>
  deleteUser(id: string): Promise<boolean>
  getAllUsers(): Promise<User[]>
  getUserCount(): Promise<number>
  saveRefreshToken(token: string): Promise<void>
  isRefreshTokenValid(token: string): Promise<boolean>
  removeRefreshToken(token: string): Promise<void>
  removeAllRefreshTokensForUser(userId: string): Promise<void>
  getRefreshTokenCount(): Promise<number>
  clearAll(): Promise<void>
  getStats(): Promise<DatabaseStats>
}

export interface IDatabaseInitializer {
  clearAll(): Promise<void>
  getStats(): Promise<DatabaseStats>
}
