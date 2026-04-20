/**
 * LocalStorage Schema Types
 * These types define the structure of data stored in browser localStorage
 */

import type { IUser, IFoodPartner } from './models.types'

export interface StoredAuthToken {
    token: string;
    expiresAt?: number;
}

export interface StoredUser extends Omit<IUser, 'password'> {
    // User data stored in localStorage (without password for security)
}

export interface StoredFoodPartner extends Omit<IFoodPartner, 'password'> {
    // Food Partner data stored in localStorage (without password for security)
}

export interface StoredLikes {
    [foodId: string]: boolean; // Map of liked food IDs
}

export interface StoredSaves {
    [foodId: string]: boolean; // Map of saved food IDs
}

export interface LocalStorageSchema {
    authToken?: string;
    user?: StoredUser;
    foodPartner?: StoredFoodPartner;
    likes?: StoredLikes;
    saves?: StoredSaves;
}
