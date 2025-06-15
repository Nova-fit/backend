export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserResponse {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JWTPayload {
  userId: string;
  email: string;
  type: "access" | "refresh";
  exp: number;
  iat: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface AuthResponse {
  message: string;
  user: UserResponse;
  tokens: AuthTokens;
}

export interface AuthContext {
  user: {
    userId: string;
    email: string;
  };
}

export interface EnvVars {
  NODE_ENV: string;
  PORT: string;
  JWT_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  JWT_REFRESH_EXPIRES: string;
  BCRYPT_ROUNDS: string;
}
