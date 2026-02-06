export declare function isValidEmail(email: string): boolean;
export declare function isDisposableEmail(email: string): boolean;
export declare function isValidUUID(uuid: string): boolean;
export declare function sanitizeString(input: string): string;
export declare function validateRegisterData(data: any): {
    isValid: boolean;
    errors: string[];
    sanitizedData?: {
        email: string;
        password: string;
    };
};
export declare function validateLoginData(data: any): {
    isValid: boolean;
    errors: string[];
    sanitizedData?: {
        email: string;
        password: string;
    };
};
export declare function validateRefreshToken(data: any): {
    isValid: boolean;
    errors: string[];
    token?: string;
};
export declare function validateRateLimit(identifier: string, maxRequests?: number, windowMs?: number): {
    allowed: boolean;
    remainingRequests: number;
    resetTime: number;
};
//# sourceMappingURL=validation.d.ts.map