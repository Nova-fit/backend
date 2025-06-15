import bcrypt from 'bcrypt'
import { config } from '@/config/env'

/**
 * Hashea una contraseña usando bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(config.BCRYPT_ROUNDS)
    return await bcrypt.hash(password, salt)
  } catch (error) {
    throw new Error('Error al hashear la contraseña')
  }
}

/**
 * Verifica una contraseña contra su hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash)
  } catch (error) {
    throw new Error('Error al verificar la contraseña')
  }
}

/**
 * Valida la fortaleza de una contraseña
 */
export function validatePasswordStrength(password: string): {
  isValid: boolean
  errors: string[]
  score: number
} {
  const errors: string[] = []
  let score = 0

  // Longitud mínima
  if (password.length < 8) {
    errors.push('La contraseña debe tener al menos 8 caracteres')
  } else {
    score += 1
  }

  // Contiene al menos una minúscula
  if (!/[a-z]/.test(password)) {
    errors.push('La contraseña debe contener al menos una letra minúscula')
  } else {
    score += 1
  }

  // Contiene al menos una mayúscula
  if (!/[A-Z]/.test(password)) {
    errors.push('La contraseña debe contener al menos una letra mayúscula')
  } else {
    score += 1
  }

  // Contiene al menos un número
  if (!/\d/.test(password)) {
    errors.push('La contraseña debe contener al menos un número')
  } else {
    score += 1
  }

  // Contiene al menos un carácter especial
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('La contraseña debe contener al menos un carácter especial')
  } else {
    score += 1
  }

  // Longitud adicional (bonus)
  if (password.length >= 12) {
    score += 1
  }

  return {
    isValid: errors.length === 0,
    errors,
    score: Math.min(score, 5) // Máximo score de 5
  }
}

/**
 * Genera una contraseña aleatoria segura
 */
export function generateSecurePassword(length: number = 16): string {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  const allChars = lowercase + uppercase + numbers + symbols
  
  let password = ''
  
  // Asegurar al menos un carácter de cada tipo
  password += lowercase[Math.floor(Math.random() * lowercase.length)]
  password += uppercase[Math.floor(Math.random() * uppercase.length)]
  password += numbers[Math.floor(Math.random() * numbers.length)]
  password += symbols[Math.floor(Math.random() * symbols.length)]
  
  // Completar con caracteres aleatorios
  for (let i = password.length; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)]
  }
  
  // Mezclar los caracteres
  return password.split('').sort(() => Math.random() - 0.5).join('')
}