/**
 * useFood Hook
 * Manages food data fetching and operations
 */

import { useState, useCallback, useEffect } from 'react'
import type { IFood } from '../types/models.types'
import type { CreateFoodPayload } from '../types/api.types'
import { apiGet, apiPost } from '@utils/api'

export interface UseFoodReturn {
    foods: IFood[];
    isLoading: boolean;
    error: string | null;
    fetchFoods: () => Promise<void>;
    createFood: (payload: CreateFoodPayload) => Promise<boolean>;
    clearError: () => void;
    refreshFoods: () => Promise<void>;
}

export const useFood = (): UseFoodReturn => {
    const [foods, setFoods] = useState<IFood[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const clearError = useCallback(() => {
        setError(null)
    }, [])

    // Fetch all food items
    const fetchFoods = useCallback(async () => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await apiGet<IFood[]>('/food')

            if (!response.success || !response.data) {
                setError(response.message || 'Failed to fetch foods')
                return
            }

            setFoods(response.data)
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch foods'
            setError(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Create new food item
    const createFood = useCallback(async (payload: CreateFoodPayload): Promise<boolean> => {
        setIsLoading(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append('name', payload.name)
            if (payload.description) {
                formData.append('description', payload.description)
            }
            formData.append('video', payload.video)

            const response = await apiPost<IFood>('/food', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (!response.success) {
                setError(response.message || 'Failed to create food')
                return false
            }

            if (response.data) {
                setFoods((prev) => [response.data!, ...prev])
            }

            return true
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create food'
            setError(errorMessage)
            return false
        } finally {
            setIsLoading(false)
        }
    }, [])

    // Refresh foods list
    const refreshFoods = useCallback(async () => {
        await fetchFoods()
    }, [fetchFoods])

    // Fetch foods on component mount
    useEffect(() => {
        fetchFoods()
    }, [fetchFoods])

    return {
        foods,
        isLoading,
        error,
        fetchFoods,
        createFood,
        clearError,
        refreshFoods,
    }
}
