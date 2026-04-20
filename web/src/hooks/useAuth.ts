/**
 * useAuth Hook
 * Manages user and food partner authentication state
 */

import { useState, useCallback, useEffect } from 'react'
import type { 
    IUser, IFoodPartner, UserAuthResponse, FoodPartnerAuthResponse, RegisterUserPayload, LoginUserPayload, RegisterFoodPartnerPayload, LoginFoodPartnerPayload } from '@types/index'
import { apiPost } from '@utils/api'
import {
    getAuthToken,
    setAuthToken,
    getStoredUser,
    setStoredUser,
    removeStoredUser,
    getStoredFoodPartner,
    setStoredFoodPartner,
    removeStoredFoodPartner,
    clearAuthStorage,
} from '@utils/storage'

export interface UseAuthReturn {
    // Auth state
    user: IUser | null;
    foodPartner: IFoodPartner | null;
    authToken: string | null;
    isLoadingUser: boolean;
    isLoadingPartner: boolean;
    error: string | null;

    // User auth methods
    registerUser: (payload: RegisterUserPayload) => Promise<boolean>;
    loginUser: (payload: LoginUserPayload) => Promise<boolean>;
    logoutUser: () => void;

    // Food Partner auth methods
    registerFoodPartner: (payload: RegisterFoodPartnerPayload) => Promise<boolean>;
    loginFoodPartner: (payload: LoginFoodPartnerPayload) => Promise<boolean>;
    logoutFoodPartner: () => void;

    // Utility methods
    clearError: () => void;
    isAuthenticated: boolean;
}

export const useAuth = (): UseAuthReturn => {
    const [user, setUser] = useState<IUser | null>(null)
    const [foodPartner, setFoodPartner] = useState<IFoodPartner | null>(null)
    const [authToken, setToken] = useState<string | null>(null)
    const [isLoadingUser, setIsLoadingUser] = useState(false)
    const [isLoadingPartner, setIsLoadingPartner] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Initialize auth from localStorage on mount
    useEffect(() => {
        const token = getAuthToken()
        const storedUser = getStoredUser()
        const storedPartner = getStoredFoodPartner()

        setToken(token)
        if (storedUser) setUser(storedUser as IUser)
        if (storedPartner) setFoodPartner(storedPartner as IFoodPartner)
    }, [])

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    // User Registration
    const registerUser = useCallback(async (payload: RegisterUserPayload): Promise<boolean> => {
        setIsLoadingUser(true)
        setError(null)

        try {
            const response = await apiPost<IUser>('/auth/user/register', payload)

            if (!response.success || !response.data) {
                setError(response.message || 'Registration failed')
                return false
            }

            if (response.token) {
                setAuthToken(response.token)
                setToken(response.token)
            }

            setStoredUser(response.data)
            setUser(response.data)
            return true
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Registration failed'
            setError(errorMessage)
            return false
        } finally {
            setIsLoadingUser(false)
        }
    }, [])

    // User Login
    const loginUser = useCallback(async (payload: LoginUserPayload): Promise<boolean> => {
        setIsLoadingUser(true)
        setError(null)

        try {
            const response = await apiPost<IUser>('/auth/user/login', payload)

            if (!response.success || !response.data) {
                setError(response.message || 'Login failed')
                return false
            }

            if (response.token) {
                setAuthToken(response.token)
                setToken(response.token)
            }

            setStoredUser(response.data)
            setUser(response.data)
            return true
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed'
            setError(errorMessage)
            return false
        } finally {
            setIsLoadingUser(false)
        }
    }, [])

    // User Logout
    const logoutUser = useCallback(() => {
        setUser(null)
        removeStoredUser()
        clearAuthStorage()
        setToken(null)
    }, [])

    // Food Partner Registration
    const registerFoodPartner = useCallback(
        async (payload: RegisterFoodPartnerPayload): Promise<boolean> => {
            setIsLoadingPartner(true)
            setError(null)

            try {
                const response = await apiPost<IFoodPartner>('/auth/food-partner/register', payload)

                if (!response.success || !response.data) {
                    setError(response.message || 'Registration failed')
                    return false
                }

                if (response.token) {
                    setAuthToken(response.token)
                    setToken(response.token)
                }

                setStoredFoodPartner(response.data)
                setFoodPartner(response.data)
                return true
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Registration failed'
                setError(errorMessage)
                return false
            } finally {
                setIsLoadingPartner(false)
            }
        },
        []
    )

    // Food Partner Login
    const loginFoodPartner = useCallback(async (payload: LoginFoodPartnerPayload): Promise<boolean> => {
        setIsLoadingPartner(true)
        setError(null)

        try {
            const response = await apiPost<IFoodPartner>('/auth/food-partner/login', payload)

            if (!response.success || !response.data) {
                setError(response.message || 'Login failed')
                return false
            }

            if (response.token) {
                setAuthToken(response.token)
                setToken(response.token)
            }

            setStoredFoodPartner(response.data)
            setFoodPartner(response.data)
            return true
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Login failed'
            setError(errorMessage)
            return false
        } finally {
            setIsLoadingPartner(false)
        }
    }, [])

    // Food Partner Logout
    const logoutFoodPartner = useCallback(() => {
        setFoodPartner(null)
        removeStoredFoodPartner()
        clearAuthStorage()
        setToken(null)
    }, [])

    return {
        user,
        foodPartner,
        authToken,
        isLoadingUser,
        isLoadingPartner,
        error,
        registerUser,
        loginUser,
        logoutUser,
        registerFoodPartner,
        loginFoodPartner,
        logoutFoodPartner,
        clearError,
        isAuthenticated: !!authToken || !!user || !!foodPartner,
    }
}
