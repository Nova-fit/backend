import type { EnvVars } from '@/types'

const defaultConfig = {
  NODE_ENV: 'development',
  PORT: '3000',
  JWT_SECRET: 'your-super-secret-jwt-key-change-this-in-production',
  JWT_ACCESS_EXPIRES: '15m', 
  JWT_REFRESH_EXPIRES: '7d', 
  BCRYPT_ROUNDS: '12'
}

function getEnvVar(key: keyof EnvVars): string {
  return process.env[key] || defaultConfig[key]
}

export const config = {
  NODE_ENV: getEnvVar('NODE_ENV'),
  PORT: parseInt(getEnvVar('PORT')),
  JWT_SECRET: getEnvVar('JWT_SECRET'),
  JWT_ACCESS_EXPIRES: getEnvVar('JWT_ACCESS_EXPIRES'),
  JWT_REFRESH_EXPIRES: getEnvVar('JWT_REFRESH_EXPIRES'),
  BCRYPT_ROUNDS: parseInt(getEnvVar('BCRYPT_ROUNDS')),
  
  IS_PRODUCTION: getEnvVar('NODE_ENV') === 'production',
  IS_DEVELOPMENT: getEnvVar('NODE_ENV') === 'development',
  
  ACCESS_TOKEN_EXPIRES_IN: 15 * 60, // 15 minutos
  REFRESH_TOKEN_EXPIRES_IN: 7 * 24 * 60 * 60, // 7 días
} as const


export function validateConfig(): void {
  if (config.JWT_SECRET === defaultConfig.JWT_SECRET && config.IS_PRODUCTION) {
    throw new Error('❌ JWT_SECRET debe ser cambiado en producción')
  }

  if (config.JWT_SECRET.length < 32) {
    console.warn('⚠️  JWT_SECRET debería tener al menos 32 caracteres')
  }

  if (config.BCRYPT_ROUNDS < 10) {
    console.warn('⚠️  BCRYPT_ROUNDS debería ser al menos 10 para mayor seguridad')
  }

  console.log('✅ Configuración validada correctamente')
}