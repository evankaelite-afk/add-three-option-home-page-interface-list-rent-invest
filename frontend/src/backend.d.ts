import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Property {
    id: bigint;
    title: string;
    minimumInvestment: bigint;
    leaseStatus: string;
    targetYield: number;
    assetType: string;
}
export interface WaitlistEntry {
    name: string;
    email: string;
    timestamp: Time;
    phoneNumber: string;
    investorType?: string;
}
export type Time = bigint;
export interface Listing {
    id: bigint;
    title: string;
    createdAt: Time;
    description: string;
    seller: Principal;
    price: bigint;
    images: Array<Uint8Array>;
}
export interface UserProfile {
    name: string;
    email: string;
    phoneNumber: string;
    investorType?: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createListing(title: string, description: string, price: bigint, images: Array<Uint8Array>): Promise<bigint>;
    getAllListings(): Promise<Array<Listing>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedProperties(): Promise<Array<Property>>;
    getListingById(id: bigint): Promise<Listing | null>;
    getListingsBySeller(seller: Principal): Promise<Array<Listing>>;
    getPropertyById(id: bigint): Promise<Property | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWaitlistEntries(): Promise<Array<WaitlistEntry>>;
    isCallerAdmin(): Promise<boolean>;
    joinWaitlist(name: string, email: string, phoneNumber: string, investorType: string | null): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
