"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = hashPassword;
exports.verifyPassword = verifyPassword;
exports.validatePasswordStrength = validatePasswordStrength;
exports.generateSecurePassword = generateSecurePassword;
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_1 = require("@/config/env");
async function hashPassword(password) {
    try {
        const salt = await bcrypt_1.default.genSalt(env_1.config.BCRYPT_ROUNDS);
        return await bcrypt_1.default.hash(password, salt);
    }
    catch (error) {
        throw new Error('Error al hashear la contraseña');
    }
}
async function verifyPassword(password, hash) {
    try {
        return await bcrypt_1.default.compare(password, hash);
    }
    catch (error) {
        throw new Error('Error al verificar la contraseña');
    }
}
function validatePasswordStrength(password) {
    const errors = [];
    let score = 0;
    if (password.length < 8) {
        errors.push('La contraseña debe tener al menos 8 caracteres');
    }
    else {
        score += 1;
    }
    if (!/[a-z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una letra minúscula');
    }
    else {
        score += 1;
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('La contraseña debe contener al menos una letra mayúscula');
    }
    else {
        score += 1;
    }
    if (!/\d/.test(password)) {
        errors.push('La contraseña debe contener al menos un número');
    }
    else {
        score += 1;
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
        errors.push('La contraseña debe contener al menos un carácter especial');
    }
    else {
        score += 1;
    }
    if (password.length >= 12) {
        score += 1;
    }
    return {
        isValid: errors.length === 0,
        errors,
        score: Math.min(score, 5)
    };
}
function generateSecurePassword(length = 16) {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = lowercase + uppercase + numbers + symbols;
    let password = '';
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    for (let i = password.length; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    return password.split('').sort(() => Math.random() - 0.5).join('');
}
//# sourceMappingURL=password.js.map