/**
 * Form Validation Utilities
 * Provides typed validation functions for common form fields
 */

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

/**
 * Validate email format
 */
export const validateEmail = (email: string): ValidationResult => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
        return { isValid: false, error: 'Email is required' }
    }
    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Invalid email format' }
    }
    return { isValid: true }
}

/**
 * Validate password strength
 * Requires at least 6 characters, 1 uppercase, 1 lowercase, 1 number
 */
export const validatePassword = (password: string): ValidationResult => {
    if (!password) {
        return { isValid: false, error: 'Password is required' }
    }
    if (password.length < 6) {
        return { isValid: false, error: 'Password must be at least 6 characters' }
    }
    if (!/[A-Z]/.test(password)) {
        return { isValid: false, error: 'Password must contain uppercase letter' }
    }
    if (!/[a-z]/.test(password)) {
        return { isValid: false, error: 'Password must contain lowercase letter' }
    }
    if (!/\d/.test(password)) {
        return { isValid: false, error: 'Password must contain number' }
    }
    return { isValid: true }
}

/**
 * Validate required text field
 */
export const validateRequired = (value: string, fieldName: string): ValidationResult => {
    if (!value || value.trim() === '') {
        return { isValid: false, error: `${fieldName} is required` }
    }
    return { isValid: true }
}

/**
 * Validate phone number (basic)
 * Accepts 10-15 digit numbers with optional +, -, ()
 */
export const validatePhoneNumber = (phone: string): ValidationResult => {
    const phoneRegex = /^[\d\s\-+()]{10,15}$/
    if (!phone) {
        return { isValid: false, error: 'Phone number is required' }
    }
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        return { isValid: false, error: 'Invalid phone number format' }
    }
    return { isValid: true }
}

/**
 * Validate URL
 */
export const validateUrl = (url: string): ValidationResult => {
    try {
        new URL(url)
        return { isValid: true }
    } catch {
        return { isValid: false, error: 'Invalid URL format' }
    }
}

/**
 * Validate file size (in MB)
 */
export const validateFileSize = (file: File, maxSizeMB: number): ValidationResult => {
    const maxSizeBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxSizeBytes) {
        return {
            isValid: false,
            error: `File size must be less than ${maxSizeMB}MB`,
        }
    }
    return { isValid: true }
}

/**
 * Validate file type
 */
export const validateFileType = (file: File, allowedTypes: string[]): ValidationResult => {
    if (!allowedTypes.includes(file.type)) {
        return {
            isValid: false,
            error: `Invalid file type. Allowed: ${allowedTypes.join(', ')}`,
        }
    }
    return { isValid: true }
}

/**
 * Validate video file
 */
export const validateVideoFile = (file: File): ValidationResult => {
    const validTypes = ['video/mp4', 'video/webm', 'video/quicktime']
    const sizeResult = validateFileSize(file, 100) // 100MB max
    if (!sizeResult.isValid) return sizeResult

    const typeResult = validateFileType(file, validTypes)
    if (!typeResult.isValid) return typeResult

    return { isValid: true }
}

/**
 * Validate image file
 */
export const validateImageFile = (file: File): ValidationResult => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    const sizeResult = validateFileSize(file, 5) // 5MB max
    if (!sizeResult.isValid) return sizeResult

    const typeResult = validateFileType(file, validTypes)
    if (!typeResult.isValid) return typeResult

    return { isValid: true }
}

/**
 * Validate password match
 */
export const validatePasswordMatch = (
    password: string,
    confirmPassword: string
): ValidationResult => {
    if (password !== confirmPassword) {
        return { isValid: false, error: 'Passwords do not match' }
    }
    return { isValid: true }
}
