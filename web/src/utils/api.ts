/**
 * Typed Axios API Instance
 * Configures axios with authentication interceptors and type-safe headers
 */

import axios, { type AxiosInstance, type AxiosError, type AxiosResponse } from 'axios'
import { getAuthToken, clearAuthStorage } from './storage'
import type { ApiResponse } from '../types/api.types'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

/**
 * Create configured axios instance
 */
const apiClient: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

/**
 * Request Interceptor
 * Attaches authentication token to all requests
 */
apiClient.interceptors.request.use(
    (config) => {
        const token = getAuthToken()
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

/**
 * Response Interceptor
 * Handles authentication failures and errors
 */
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        // Handle 401 Unauthorized - token expired or invalid
        if (error.response?.status === 401) {
            clearAuthStorage()
            // Optionally redirect to login
            window.location.href = '/user/login'
        }

        // Handle 403 Forbidden
        if (error.response?.status === 403) {
            console.error('Access forbidden')
        }

        // Handle 500 Server Error
        if (error.response?.status === 500) {
            console.error('Server error. Please try again later.')
        }

        return Promise.reject(error)
    }
)

/**
 * Type-safe GET request wrapper
 */
export const apiGet = async <T = unknown>(
    url: string,
    config?: object
): Promise<ApiResponse<T>> => {
    try {
        const response = await apiClient.get<ApiResponse<T>>(url, config)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Request failed',
                error: error.message,
            }
        }
        return {
            success: false,
            message: 'An unknown error occurred',
            error: String(error),
        }
    }
}

/**
 * Type-safe POST request wrapper
 */
export const apiPost = async <T = unknown>(
    url: string,
    data?: unknown,
    config?: object
): Promise<ApiResponse<T>> => {
    try {
        const response = await apiClient.post<ApiResponse<T>>(url, data, config)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Request failed',
                error: error.message,
            }
        }
        return {
            success: false,
            message: 'An unknown error occurred',
            error: String(error),
        }
    }
}

/**
 * Type-safe PUT request wrapper
 */
export const apiPut = async <T = unknown>(
    url: string,
    data?: unknown,
    config?: object
): Promise<ApiResponse<T>> => {
    try {
        const response = await apiClient.put<ApiResponse<T>>(url, data, config)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Request failed',
                error: error.message,
            }
        }
        return {
            success: false,
            message: 'An unknown error occurred',
            error: String(error),
        }
    }
}

/**
 * Type-safe DELETE request wrapper
 */
export const apiDelete = async <T = unknown>(
    url: string,
    config?: object
): Promise<ApiResponse<T>> => {
    try {
        const response = await apiClient.delete<ApiResponse<T>>(url, config)
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message || error.message || 'Request failed',
                error: error.message,
            }
        }
        return {
            success: false,
            message: 'An unknown error occurred',
            error: String(error),
        }
    }
}

export default apiClient
