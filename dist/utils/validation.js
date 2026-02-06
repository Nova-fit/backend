"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidEmail = isValidEmail;
exports.isDisposableEmail = isDisposableEmail;
exports.isValidUUID = isValidUUID;
exports.sanitizeString = sanitizeString;
exports.validateRegisterData = validateRegisterData;
exports.validateLoginData = validateLoginData;
exports.validateRefreshToken = validateRefreshToken;
exports.validateRateLimit = validateRateLimit;
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.toLowerCase());
}
function isDisposableEmail(email) {
    const disposableDomains = [
        '10minutemail.com',
        'guerrillamail.com',
        'mailinator.com',
        'tempmail.org',
        'yopmail.com',
        '7mail.ga',
        'dispostable.com'
    ];
    const domain = email.toLowerCase().split('@')[1];
    return disposableDomains.includes(domain);
}
function isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
}
function sanitizeString(input) {
    return input.trim().replace(/[<>\"']/g, '');
}
function validateRegisterData(data) {
    const errors = [];
    if (!data.email || !data.password) {
        errors.push('Email y contraseña son requeridos');
        return { isValid: false, errors };
    }
    const sanitizedEmail = sanitizeString(data.email).toLowerCase();
    const password = data.password;
    if (!isValidEmail(sanitizedEmail)) {
        errors.push('Formato de email inválido');
    }
    if (isDisposableEmail(sanitizedEmail)) {
        errors.push('No se permiten emails temporales');
    }
    if (typeof password !== 'string') {
        errors.push('La contraseña debe ser un texto');
    }
    else if (password.length < 6) {
        errors.push('La contraseña debe tener al menos 6 caracteres');
    }
    else if (password.length > 128) {
        errors.push('La contraseña es demasiado larga (máximo 128 caracteres)');
    }
    if (password.includes('\0') || password.includes('\r') || password.includes('\n')) {
        errors.push('La contraseña contiene caracteres no válidos');
    }
    return {
        isValid: errors.length === 0,
        errors,
        sanitizedData: errors.length === 0 ? { email: sanitizedEmail, password } : undefined
    };
}
function validateLoginData(data) {
    const errors = [];
    if (!data.email || !data.password) {
        errors.push('Email y contraseña son requeridos');
        return { isValid: false, errors };
    }
    const sanitizedEmail = sanitizeString(data.email).toLowerCase();
    const password = data.password;
    if (!isValidEmail(sanitizedEmail)) {
        errors.push('Formato de email inválido');
    }
    if (typeof password !== 'string' || password.length === 0) {
        errors.push('Contraseña inválida');
    }
    return {
        isValid: errors.length === 0,
        errors,
        sanitizedData: errors.length === 0 ? { email: sanitizedEmail, password } : undefined
    };
}
function validateRefreshToken(data) {
    const errors = [];
    if (!data.refreshToken) {
        errors.push('Refresh token es requerido');
        return { isValid: false, errors };
    }
    const token = data.refreshToken;
    if (typeof token !== 'string') {
        errors.push('Refresh token debe ser un string');
    }
    else if (token.length === 0) {
        errors.push('Refresh token no puede estar vacío');
    }
    else if (token.length > 1000) {
        errors.push('Refresh token es demasiado largo');
    }
    return {
        isValid: errors.length === 0,
        errors,
        token: errors.length === 0 ? token : undefined
    };
}
function validateRateLimit(identifier, maxRequests = 5, windowMs = 15 * 60 * 1000) {
    const now = Date.now();
    const key = `rate_limit_${identifier}`;
    const stored = global[key] || { count: 0, resetTime: now + windowMs };
    if (now > stored.resetTime) {
        stored.count = 1;
        stored.resetTime = now + windowMs;
    }
    else {
        stored.count++;
    }
    global[key] = stored;
    return {
        allowed: stored.count <= maxRequests,
        remainingRequests: Math.max(0, maxRequests - stored.count),
        resetTime: stored.resetTime
    };
}
//# sourceMappingURL=validation.js.map