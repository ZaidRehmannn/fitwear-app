import { orderService } from '@/services/orderService';
import { useEffect, useState } from 'react';

export const useCheckout = () => {
    const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
    const [isFetchingAddr, setIsFetchingAddr] = useState(true);

    const loadAddresses = async () => {
        try {
            setIsFetchingAddr(true);
            const data = await orderService.fetchSavedAddresses();
            setSavedAddresses(data);
        } catch (error) {
            console.error("Failed to load addresses", error);
        } finally {
            setIsFetchingAddr(false);
        }
    };

    useEffect(() => {
        loadAddresses();
    }, []);

    return {
        savedAddresses,
        isFetchingAddr,
        refreshAddresses: loadAddresses
    };
};