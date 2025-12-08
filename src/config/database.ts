import type { User } from '@/model/types'
import type { IDatabase, DatabaseStats, IDatabaseInitializer } from '@/interfaces/database.interface'

abstract class BaseDatabase implements IDatabase {
  abstract createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User>
  abstract findUserByEmail(email: string): Promise<User | null>
  abstract findUserById(id: string): Promise<User | null>
  abstract updateUser(id: string, updates: Partial<User>): Promise<User | null>
  abstract deleteUser(id: string): Promise<boolean>
  abstract getAllUsers(): Promise<User[]>
  abstract getUserCount(): Promise<number>
  abstract saveRefreshToken(token: string): Promise<void>
  abstract isRefreshTokenValid(token: string): Promise<boolean>
  abstract removeRefreshToken(token: string): Promise<void>
  abstract removeAllRefreshTokensForUser(userId: string): Promise<void>
  abstract getRefreshTokenCount(): Promise<number>
  abstract clearAll(): Promise<void>
  abstract getStats(): Promise<DatabaseStats>
}

class InMemoryDatabase extends BaseDatabase implements IDatabaseInitializer {
  private users: User[] = []
  private refreshTokens: Set<string> = new Set()

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const now = new Date()
    const user: User = {
      id: crypto.randomUUID(),
      ...userData,
      createdAt: now,
      updatedAt: now
    }

    this.users.push(user)
    return user
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find(user => user.email === email) || null
  }

  async findUserById(id: string): Promise<User | null> {
    return this.users.find(user => user.id === id) || null
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | null> {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) return null
    if (userIndex === undefined) return null
    this.users[userIndex] = {
      ...this.users[userIndex],
      ...updates,
      updatedAt: new Date()
    } as User

    return this.users[userIndex] as User
  }

  async deleteUser(id: string): Promise<boolean> {
    const userIndex = this.users.findIndex(user => user.id === id)
    if (userIndex === -1) return false

    this.users.splice(userIndex, 1)
    return true
  }

  async getAllUsers(): Promise<User[]> {
    return [...this.users]
  }

  async saveRefreshToken(token: string): Promise<void> {
    this.refreshTokens.add(token)
  }

  async isRefreshTokenValid(token: string): Promise<boolean> {
    return this.refreshTokens.has(token)
  }

  async removeRefreshToken(token: string): Promise<void> {
    this.refreshTokens.delete(token)
  }

  async removeAllRefreshTokensForUser(userId: string): Promise<void> {
    console.log(`Removing all refresh tokens for user: ${userId}`)
  }

  async getUserCount(): Promise<number> {
    return this.users.length
  }

  async getRefreshTokenCount(): Promise<number> {
    return this.refreshTokens.size
  }

  async clearAll(): Promise<void> {
    this.users = []
    this.refreshTokens.clear()
  }

  async getStats(): Promise<DatabaseStats> {
    return {
      users: this.users.length,
      refreshTokens: this.refreshTokens.size,
      lastUserCreated: this.users.length > 0
        ? this.users[this.users.length - 1]!.createdAt
        : null
    }
  }
}

export { BaseDatabase, InMemoryDatabase }
export const db = new InMemoryDatabase()

export async function initializeDatabase(): Promise<void> {
  try {
    const userCount = await db.getUserCount()

    if (userCount === 0) {
      console.log('🔄 Inicializando base de datos con datos de prueba...')

      // Crear usuario de prueba (contraseña: "password123")
      await db.createUser({
        email: 'test@example.com',
        password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCukEyeIZJVZhLUJZyJq7.vHV7qrUqJ0Vm' // password123
      })

      console.log('✅ Base de datos inicializada con usuario de prueba')
      console.log('📧 Email: test@example.com | 🔑 Password: password123')
    }

    const stats = await db.getStats()
    console.log('📊 Estadísticas de BD:', stats)
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error)
  }
}
