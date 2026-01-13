import { getAllProducts, getProductsByCategory, Product } from "@/services/productService";
import { useEffect, useState } from "react";

export const useProducts = (category: string) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchProducts = async () => {
            try {
                const data = category === "All"
                    ? await getAllProducts()
                    : await getProductsByCategory(category);

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
