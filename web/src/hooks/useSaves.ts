/**
 * useSaves Hook
 * Manages saved food items and like operations
 */

import { useState, useCallback, useEffect } from 'react'
import type { IFood } from '../types/models.types'
import { apiGet, apiPost } from '@utils/api'
import {
    addSave,
    removeSave,
    isSaved,
    addLike,
    removeLike,
    isLiked,
} from '@utils/storage'

export interface UseSavesReturn {
    savedFoods: IFood[];
    isLoadingSaves: boolean;
    error: string | null;
    fetchSavedFoods: () => Promise<void>;
    saveFoodItem: (foodId: string) => Promise<boolean>;
    unsaveFoodItem: (foodId: string) => Promise<boolean>;
    likeFoodItem: (foodId: string) => Promise<boolean>;
    unlikeFoodItem: (foodId: string) => Promise<boolean>;
    isFoodSaved: (foodId: string) => boolean;
    isFoodLiked: (foodId: string) => boolean;
    clearError: () => void;
}

export const useSaves = (): UseSavesReturn => {
    const [savedFoods, setSavedFoods] = useState<IFood[]>([])
    const [isLoadingSaves, setIsLoadingSaves] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    // Fetch saved food items
    const fetchSavedFoods = useCallback(async () => {
        setIsLoadingSaves(true)
        setError(null)

        try {
            const response = await apiGet<IFood[]>('/food/saved')

            if (!response.success || !response.data) {
                setError(response.message || 'Failed to fetch saved foods')
                setSavedFoods([])
                return
            }

            setSavedFoods(response.data)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch saved foods'
            setError(errorMessage)
            setSavedFoods([])
        } finally {
            setIsLoadingSaves(false)
        }
    }, [])

    // Save a food item
    const saveFoodItem = useCallback(async (foodId: string): Promise<boolean> => {
        setError(null)

        try {
            const response = await apiPost('/food/save', { foodId })

            if (!response.success) {
                setError(response.message || 'Failed to save food')
                return false
            }

            // Update local storage
            addSave(foodId)
            return true
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to save food'
            setError(errorMessage)
            return false
        }
    }, [])

    // Unsave a food item
    const unsaveFoodItem = useCallback(async (foodId: string): Promise<boolean> => {
        setError(null)

        try {
            const response = await apiPost(`/food/save/${foodId}`, {})

            if (!response.success) {
                setError(response.message || 'Failed to unsave food')
                return false
            }

            // Update local storage
            removeSave(foodId)
            // Remove from saved foods list
            setSavedFoods((prev) => prev.filter((food) => food._id !== foodId))
            return true
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to unsave food'
            setError(errorMessage)
            return false
        }
    }, [])

    // Like a food item
    const likeFoodItem = useCallback(async (foodId: string): Promise<boolean> => {
        setError(null)

        try {
            const response = await apiPost('/food/like', { foodId })

            if (!response.success) {
                setError(response.message || 'Failed to like food')
                return false
            }

            // Update local storage
            addLike(foodId)
            return true
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to like food'
            setError(errorMessage)
            return false
        }
    }, [])

    // Unlike a food item
    const unlikeFoodItem = useCallback(async (foodId: string): Promise<boolean> => {
        setError(null)

        try {
            const response = await apiPost(`/food/like/${foodId}`, {})

            if (!response.success) {
                setError(response.message || 'Failed to unlike food')
                return false
            }

            // Update local storage
            removeLike(foodId)
            return true
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to unlike food'
            setError(errorMessage)
            return false
        }
    }, [])

    // Check if food is saved (from localStorage)
    const isFoodSaved = useCallback((foodId: string): boolean => {
        return isSaved(foodId)
    }, [])

    // Check if food is liked (from localStorage)
    const isFoodLiked = useCallback((foodId: string): boolean => {
        return isLiked(foodId)
    }, [])

    // Fetch saved foods on mount
    useEffect(() => {
        fetchSavedFoods()
    }, [fetchSavedFoods])

    return {
        savedFoods,
        isLoadingSaves,
        error,
        fetchSavedFoods,
        saveFoodItem,
        unsaveFoodItem,
        likeFoodItem,
        unlikeFoodItem,
        isFoodSaved,
        isFoodLiked,
        clearError,
    }
}
