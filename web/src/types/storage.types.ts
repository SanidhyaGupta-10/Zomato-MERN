/**
 * LocalStorage Schema Types
 * These types define the structure of data stored in browser localStorage
 */

import type { IUser, IFoodPartner } from './models.types'

export interface StoredAuthToken {
    token: string;
    expiresAt?: number;
}

export type StoredUser = Omit<IUser, 'password'>

export type StoredFoodPartner = Omit<IFoodPartner, 'password'>

export type StoredLikes = Record<string, boolean> // Map of liked food IDs

export type StoredSaves = Record<string, boolean> // Map of saved food IDs

export interface LocalStorageSchema {
    authToken?: string;
    user?: StoredUser;
    foodPartner?: StoredFoodPartner;
    likes?: StoredLikes;
    saves?: StoredSaves;
}
