
import { User } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'user' | 'colaborador';
export type UserStatus = 'active' | 'banned' | 'suspended' | 'pending' | 'deleted';
export type SecurityFlag = 'fraude' | 'estafa' | 'extorsion' | 'uso_indebido' | 'prueba' | 'inactividad' | 'eliminacion' | 'n/a';
export type LanguageCode = 'es' | 'en';

export interface Profile {
    id: string;
    email: string;
    full_name?: string;
    role: UserRole;
    status: UserStatus;
    security_flag?: SecurityFlag;
    security_notes?: string;
    phone?: string;
    created_at: string;
    updated_at?: string;
}

export interface AuthState {
    user: User | null;
    profile: Profile | null;
    loading: boolean;
    isAdmin: boolean;
}

export type Multilingual = Record<LanguageCode, string>;
export type MultilingualTags = Record<LanguageCode, string[]>;

export interface ProductVariant {
    id: string;
    name: string; // e.g. "250g", "500g", "1kg" or "Small", "Large"
    price: number;
    stock: number;
}

export interface Product {
    id: string;
    category: 'coffee' | 'accessories' | 'derivatives';
    name: Multilingual;
    price: number; // Base price (Starting at)
    image_url: string;
    stock: number; // General stock or aggregate
    description: Multilingual;
    story: Multilingual;
    tags: MultilingualTags;
    badge?: Multilingual;
    score?: number;
    color: string;
    mask_type: 'pop' | 'static';
    overlay_url?: string;
    variants?: ProductVariant[];
    created_at?: string;
}

export interface ProductInput {
    category: 'coffee' | 'accessories' | 'derivatives';
    name: Multilingual;
    price: number;
    image_url: string;
    stock: number;
    description: Multilingual;
    story: Multilingual;
    tags: MultilingualTags;
    badge?: Multilingual;
    score?: number;
    color: string;
    mask_type: 'pop' | 'static';
    overlay_url?: string;
    variants?: ProductVariant[];
}

// Subscription related types
export interface FlavorProfile {
    id: string;
    title: string;
    desc: string;
    icon: string;
}

export interface CoffeeFormat {
    id: string;
    title: string;
    desc: string;
    img: string;
}

// Brewing Guide types
export interface CoffeeMethod {
    title: string;
    time: string;
    texture: string;
    img: string;
    desc: string;
}

// AI Lab types
export interface Message {
    id: string;
    role: 'user' | 'model';
    content: string;
    timestamp: Date;
}

export interface GenerationState {
    isLoading: boolean;
    resultUri: string | null;
    error: string | null;
}

export interface VideoGenerationState {
    isLoading: boolean;
    videoUri: string | null;
    statusMessage: string;
    error: string | null;
}
