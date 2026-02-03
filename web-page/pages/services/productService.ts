
import { supabase } from './supabaseClient';
import { Product } from '../types';

export const productService = {
    getAllProducts: async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        return { data: data as Product[] || [], error };
    },

    getProductById: async (id: string) => {
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .single();

        return { data: data as Product | null, error };
    },

    createProduct: async (product: Omit<Product, 'id' | 'created_at'>) => {
        const { data, error } = await supabase
            .from('products')
            .insert([product])
            .select();

        return { data, error };
    },

    updateProduct: async (id: string, updates: Partial<Product>) => {
        const { data, error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', id)
            .select();

        return { data, error };
    },

    deleteProduct: async (id: string) => {
        const { error } = await supabase
            .from('products')
            .delete()
            .eq('id', id);

        return { error };
    }
};
