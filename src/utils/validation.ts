/**
 * Valida formato de email
 */
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email.toLowerCase())
  }
  
  /**
   * Valida que el email no sea de dominios temporales conocidos
   */
  export function isDisposableEmail(email: string): boolean {
    const disposableDomains = [
      '10minutemail.com',
      'guerrillamail.com',
      'mailinator.com',
      'tempmail.org',
      'yopmail.com',
      '7mail.ga',
      'dispostable.com'
    ]
    
    const domain = email.toLowerCase().split('@')[1]
    return disposableDomains.includes(domain!)
  }
  
  /**
   * Valida formato de UUID
   */
  export function isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    return uuidRegex.test(uuid)
  }
  
  /**
   * Sanitiza entrada de texto
   */
  export function sanitizeString(input: string): string {
    return input.trim().replace(/[<>\"']/g, '')
  }
  
  /**
   * Valida datos de registro
   */
  export function validateRegisterData(data: any): {
    isValid: boolean
    errors: string[]
    sanitizedData?: { email: string; password: string }
  } {
    const errors: string[] = []
  
    // Verificar que existan los campos requeridos
    if (!data.email || !data.password) {
      errors.push('Email y contraseña son requeridos')
      return { isValid: false, errors }
    }
  
    // Sanitizar datos
    const sanitizedEmail = sanitizeString(data.email).toLowerCase()
    const password = data.password
  
    // Validar email
    if (!isValidEmail(sanitizedEmail)) {
      errors.push('Formato de email inválido')
    }
  
    if (isDisposableEmail(sanitizedEmail)) {
      errors.push('No se permiten emails temporales')
    }
  
    // Validar contraseña
    if (typeof password !== 'string') {
      errors.push('La contraseña debe ser un texto')
    } else if (password.length < 6) {
      errors.push('La contraseña debe tener al menos 6 caracteres')
    } else if (password.length > 128) {
      errors.push('La contraseña es demasiado larga (máximo 128 caracteres)')
    }
  
    // Verificar caracteres peligrosos en contraseña
    if (password.includes('\0') || password.includes('\r') || password.includes('\n')) {
      errors.push('La contraseña contiene caracteres no válidos')
    }
  
    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData: errors.length === 0 ? { email: sanitizedEmail, password } : undefined
    }
  }
  
  /**
   * Valida datos de login
   */
  export function validateLoginData(data: any): {
    isValid: boolean
    errors: string[]
    sanitizedData?: { email: string; password: string }
  } {
    const errors: string[] = []
  
    // Verificar que existan los campos requeridos
    if (!data.email || !data.password) {
      errors.push('Email y contraseña son requeridos')
      return { isValid: false, errors }
    }
  
    // Sanitizar email
    const sanitizedEmail = sanitizeString(data.email).toLowerCase()
    const password = data.password
  
    // Validaciones básicas
    if (!isValidEmail(sanitizedEmail)) {
      errors.push('Formato de email inválido')
    }
  
    if (typeof password !== 'string' || password.length === 0) {
      errors.push('Contraseña inválida')
    }
  
    return {
      isValid: errors.length === 0,
      errors,
      sanitizedData: errors.length === 0 ? { email: sanitizedEmail, password } : undefined
    }
  }
  
  /**
   * Valida token de refresh
   */
  export function validateRefreshToken(data: any): {
    isValid: boolean
    errors: string[]
    token?: string
  } {
    const errors: string[] = []
  
    if (!data.refreshToken) {
      errors.push('Refresh token es requerido')
      return { isValid: false, errors }
    }
  
    const token = data.refreshToken
  
    if (typeof token !== 'string') {
      errors.push('Refresh token debe ser un string')
    } else if (token.length === 0) {
      errors.push('Refresh token no puede estar vacío')
    } else if (token.length > 1000) {
      errors.push('Refresh token es demasiado largo')
    }
  
    return {
      isValid: errors.length === 0,
      errors,
      token: errors.length === 0 ? token : undefined
    }
  }
  
  /**
   * Valida límites de rate limiting
   */
  export function validateRateLimit(identifier: string, maxRequests: number = 5, windowMs: number = 15 * 60 * 1000): {
    allowed: boolean
    remainingRequests: number
    resetTime: number
  } {
    // Simulación simple de rate limiting (en producción usar Redis o similar)
    const now = Date.now()
    const key = `rate_limit_${identifier}`
    
    // En una implementación real, esto estaría en Redis/memoria compartida
    const stored = global[key as keyof typeof global] as any || { count: 0, resetTime: now + windowMs }
    
    if (now > stored.resetTime) {
      stored.count = 1
      stored.resetTime = now + windowMs
    } else {
      stored.count++
    }
    
    (global as any)[key] = stored;
    
    return {
      allowed: stored.count <= maxRequests,
      remainingRequests: Math.max(0, maxRequests - stored.count),
      resetTime: stored.resetTime
    }
  }