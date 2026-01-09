import { getAllProducts, getProductsByCategory, Product } from "@/services/productService";
import { useEffect, useState } from "react";

export const useProducts = (category: string | null) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchProducts = async () => {
            try {
                const data = category
                    ? await getProductsByCategory(category)
                    : await getAllProducts();

                setProducts(data);
            } catch {
                setError("Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    return { products, loading, error };
};
