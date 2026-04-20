/**
 * Database Model Types
 * These types mirror the backend MongoDB schema models
 */

export interface IUser {
    _id?: string;
    fullName: string;
    email: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IFoodPartner {
    _id?: string;
    name: string;
    contactName: string;
    phoneNumber: string;
    address: string;
    email: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IFood {
    _id?: string;
    name: string;
    video: string; // URL or file reference
    description?: string;
    foodPartner: string; // ObjectId reference
    likeCount: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface ILike {
    _id?: string;
    user: string; // ObjectId reference
    food: string; // ObjectId reference
    createdAt?: string;
    updatedAt?: string;
}

export interface ISave {
    _id?: string;
    user: string; // ObjectId reference
    food: string; // ObjectId reference
    createdAt?: string;
    updatedAt?: string;
}
