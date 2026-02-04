import { supabase } from './supabaseClient';

export interface OrderItem {
    id: string;
    product_id: number;
    quantity: number;
    price_at_time: number;
    products?: {
        name: any;
        image_url: string;
    };
}

export interface Order {
    id: string;
    created_at: string;
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
    total_amount: number;
    shipping_address: any;
    payment_method?: string;
    order_items: OrderItem[];
}

export const orderService = {
    getUserOrders: async (userId: string) => {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                *,
                order_items (
                    *,
                    products (
                        name,
                        image_url
                    )
                )
            `)
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        return { data: data as Order[] | null, error };
    }
};
