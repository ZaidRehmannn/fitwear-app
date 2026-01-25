import { useWishlist } from '@/context/WishlistContext';
import { getProductById, Product } from '@/services/productService';
import { useEffect, useState } from 'react';

export const useWishlistProducts = () => {
    const { wishlist } = useWishlist();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWishlistedItems = async () => {
            if (wishlist.length === 0) {
                setProducts([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const productPromises = wishlist.map(id => getProductById(id));
                const results = await Promise.all(productPromises);

                // Filter out any null results if a product was deleted from DB
                setProducts(results.filter((p): p is Product => p !== null));
            } catch (error) {
                console.error("Error fetching wishlist products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlistedItems();
    }, [wishlist]);

    return { products, loading };
};