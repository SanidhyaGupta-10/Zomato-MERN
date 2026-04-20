/**
 * API Request/Response Types
 * These types define all request payloads and response structures for backend API endpoints
 */

import type { IUser, IFoodPartner, IFood, ILike, ISave } from './models.types'

// ============================================================================
// Auth API Types
// ============================================================================

export interface RegisterUserPayload {
    fullName: string;
    email: string;
    password: string;
}

export interface LoginUserPayload {
    email: string;
    password: string;
}

export interface RegisterFoodPartnerPayload {
    name: string;
    contactName: string;
    phoneNumber: string;
    address: string;
    email: string;
    password: string;
}

export interface LoginFoodPartnerPayload {
    email: string;
    password: string;
}

export interface AuthResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    token?: string;
    error?: string;
}

export type UserAuthResponse = AuthResponse<IUser>;
export type FoodPartnerAuthResponse = AuthResponse<IFoodPartner>;

// ============================================================================
// Food API Types
// ============================================================================

export interface CreateFoodPayload {
    name: string;
    description?: string;
    video: File; // File object from FormData
}

export interface FoodResponse {
    success: boolean;
    message: string;
    data?: IFood;
    error?: string;
}

export interface FoodListResponse {
    success: boolean;
    message: string;
    data?: IFood[];
    error?: string;
}

// ============================================================================
// Like API Types
// ============================================================================

export interface LikeFoodPayload {
    foodId: string;
}

export interface LikeResponse {
    success: boolean;
    message: string;
    data?: ILike;
    error?: string;
}

// ============================================================================
// Save API Types
// ============================================================================

export interface SaveFoodPayload {
    foodId: string;
}

export interface SaveResponse {
    success: boolean;
    message: string;
    data?: ISave;
    error?: string;
}

export interface SavesListResponse {
    success: boolean;
    message: string;
    data?: ISave[];
    error?: string;
}

// ============================================================================
// Common API Error Response
// ============================================================================

export interface ApiErrorResponse {
    success: false;
    message: string;
    error?: string;
    statusCode?: number;
}

export interface ApiSuccessResponse<T = unknown> {
    success: true;
    message: string;
    data?: T;
    statusCode?: number;
}

// Generic API response type
export type ApiResponse<T = unknown> = ApiSuccessResponse<T> | ApiErrorResponse;
