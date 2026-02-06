"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.InMemoryDatabase = exports.BaseDatabase = void 0;
exports.initializeDatabase = initializeDatabase;
class BaseDatabase {
}
exports.BaseDatabase = BaseDatabase;
class InMemoryDatabase extends BaseDatabase {
    users = [];
    refreshTokens = new Set();
    async createUser(userData) {
        const now = new Date();
        const user = {
            id: crypto.randomUUID(),
            ...userData,
            createdAt: now,
            updatedAt: now
        };
        this.users.push(user);
        return user;
    }
    async findUserByEmail(email) {
        return this.users.find(user => user.email === email) || null;
    }
    async findUserById(id) {
        return this.users.find(user => user.id === id) || null;
    }
    async updateUser(id, updates) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1)
            return null;
        if (userIndex === undefined)
            return null;
        this.users[userIndex] = {
            ...this.users[userIndex],
            ...updates,
            updatedAt: new Date()
        };
        return this.users[userIndex];
    }
    async deleteUser(id) {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1)
            return false;
        this.users.splice(userIndex, 1);
        return true;
    }
    async getAllUsers() {
        return [...this.users];
    }
    async saveRefreshToken(token) {
        this.refreshTokens.add(token);
    }
    async isRefreshTokenValid(token) {
        return this.refreshTokens.has(token);
    }
    async removeRefreshToken(token) {
        this.refreshTokens.delete(token);
    }
    async removeAllRefreshTokensForUser(userId) {
        console.log(`Removing all refresh tokens for user: ${userId}`);
    }
    async getUserCount() {
        return this.users.length;
    }
    async getRefreshTokenCount() {
        return this.refreshTokens.size;
    }
    async clearAll() {
        this.users = [];
        this.refreshTokens.clear();
    }
    async getStats() {
        return {
            users: this.users.length,
            refreshTokens: this.refreshTokens.size,
            lastUserCreated: this.users.length > 0
                ? this.users[this.users.length - 1].createdAt
                : null
        };
    }
}
exports.InMemoryDatabase = InMemoryDatabase;
exports.db = new InMemoryDatabase();
async function initializeDatabase() {
    try {
        const userCount = await exports.db.getUserCount();
        if (userCount === 0) {
            console.log('🔄 Inicializando base de datos con datos de prueba...');
            await exports.db.createUser({
                email: 'test@example.com',
                password: '$2b$12$LQv3c1yqBWVHxkd0LHAkCukEyeIZJVZhLUJZyJq7.vHV7qrUqJ0Vm',
                isActive: true
            });
            console.log('✅ Base de datos inicializada con usuario de prueba');
            console.log('📧 Email: test@example.com | 🔑 Password: password123');
        }
        const stats = await exports.db.getStats();
        console.log('📊 Estadísticas de BD:', stats);
    }
    catch (error) {
        console.error('❌ Error al inicializar la base de datos:', error);
    }
}
//# sourceMappingURL=database.js.map