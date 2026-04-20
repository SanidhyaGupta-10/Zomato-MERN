/**
 * Typed LocalStorage Utilities
 * Provides type-safe getters and setters for browser localStorage
 */

import type { StoredUser, StoredFoodPartner, StoredLikes, StoredSaves } from '../types/storage.types'
import type { IUser, IFoodPartner } from '../types/models.types'

const STORAGE_KEYS = {
    AUTH_TOKEN: 'authToken',
    USER: 'user',
    FOOD_PARTNER: 'foodPartner',
    LIKES: 'likes',
    SAVES: 'saves',
} as const

/**
 * Set authentication token in localStorage
 */
export const setAuthToken = (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token)
}

/**
 * Get authentication token from localStorage
 */
export const getAuthToken = (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
}

/**
 * Remove authentication token from localStorage
 */
export const removeAuthToken = (): void => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
}

/**
 * Set user data in localStorage (password excluded for security)
 */
export const setStoredUser = (user: IUser): void => {
    const storedUser: StoredUser = {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(storedUser))
}

/**
 * Get user data from localStorage
 */
export const getStoredUser = (): StoredUser | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER)
    if (!data) return null
    try {
        return JSON.parse(data) as StoredUser
    } catch {
        console.error('Failed to parse stored user data')
        return null
    }
}

/**
 * Remove user data from localStorage
 */
export const removeStoredUser = (): void => {
    localStorage.removeItem(STORAGE_KEYS.USER)
}

/**
 * Set food partner data in localStorage (password excluded for security)
 */
export const setStoredFoodPartner = (partner: IFoodPartner): void => {
    const storedPartner: StoredFoodPartner = {
        _id: partner._id,
        name: partner.name,
        contactName: partner.contactName,
        phoneNumber: partner.phoneNumber,
        address: partner.address,
        email: partner.email,
        createdAt: partner.createdAt,
        updatedAt: partner.updatedAt,
    }
    localStorage.setItem(STORAGE_KEYS.FOOD_PARTNER, JSON.stringify(storedPartner))
}

/**
 * Get food partner data from localStorage
 */
export const getStoredFoodPartner = (): StoredFoodPartner | null => {
    const data = localStorage.getItem(STORAGE_KEYS.FOOD_PARTNER)
    if (!data) return null
    try {
        return JSON.parse(data) as StoredFoodPartner
    } catch {
        console.error('Failed to parse stored food partner data')
        return null
    }
}

/**
 * Remove food partner data from localStorage
 */
export const removeStoredFoodPartner = (): void => {
    localStorage.removeItem(STORAGE_KEYS.FOOD_PARTNER)
}

/**
 * Set liked food IDs in localStorage
 */
export const setStoredLikes = (likes: StoredLikes): void => {
    localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likes))
}

/**
 * Get liked food IDs from localStorage
 */
export const getStoredLikes = (): StoredLikes => {
    const data = localStorage.getItem(STORAGE_KEYS.LIKES)
    if (!data) return {}
    try {
        return JSON.parse(data) as StoredLikes
    } catch {
        console.error('Failed to parse stored likes')
        return {}
    }
}

/**
 * Add a liked food ID to localStorage
 */
export const addLike = (foodId: string): void => {
    const likes = getStoredLikes()
    likes[foodId] = true
    setStoredLikes(likes)
}

/**
 * Remove a liked food ID from localStorage
 */
export const removeLike = (foodId: string): void => {
    const likes = getStoredLikes()
    delete likes[foodId]
    setStoredLikes(likes)
}

/**
 * Check if a food is liked
 */
export const isLiked = (foodId: string): boolean => {
    const likes = getStoredLikes()
    return !!likes[foodId]
}

/**
 * Set saved food IDs in localStorage
 */
export const setStoredSaves = (saves: StoredSaves): void => {
    localStorage.setItem(STORAGE_KEYS.SAVES, JSON.stringify(saves))
}

/**
 * Get saved food IDs from localStorage
 */
export const getStoredSaves = (): StoredSaves => {
    const data = localStorage.getItem(STORAGE_KEYS.SAVES)
    if (!data) return {}
    try {
        return JSON.parse(data) as StoredSaves
    } catch {
        console.error('Failed to parse stored saves')
        return {}
    }
}

/**
 * Add a saved food ID to localStorage
 */
export const addSave = (foodId: string): void => {
    const saves = getStoredSaves()
    saves[foodId] = true
    setStoredSaves(saves)
}

/**
 * Remove a saved food ID from localStorage
 */
export const removeSave = (foodId: string): void => {
    const saves = getStoredSaves()
    delete saves[foodId]
    setStoredSaves(saves)
}

/**
 * Check if a food is saved
 */
export const isSaved = (foodId: string): boolean => {
    const saves = getStoredSaves()
    return !!saves[foodId]
}

/**
 * Clear all authentication and user data from localStorage
 * Keeps saved/likes data for offline support
 */
export const clearAuthStorage = (): void => {
    removeAuthToken()
    removeStoredUser()
    removeStoredFoodPartner()
}

/**
 * Clear all storage (full logout)
 */
export const clearAllStorage = (): void => {
    localStorage.clear()
}
