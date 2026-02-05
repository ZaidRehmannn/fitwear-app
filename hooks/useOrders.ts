import { orderService } from '@/services/orderService';
import { useCallback, useEffect, useState } from 'react';

export const useOrders = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [orderCount, setOrderCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            const data = await orderService.getUserOrders();
            setOrders(data);
            setOrderCount(data.length);
        } catch (error) {
            console.error("Error in useOrders hook:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return {
        orders,
        orderCount,
        loading,
        refreshOrders: fetchOrders
    };
};