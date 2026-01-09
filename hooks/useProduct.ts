import { getProductById, Product } from "@/services/productService";
import { useEffect, useState } from "react";

export const useProduct = (id: string | null) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        setLoading(true);
        setError(null);

        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                if (data) {
                    setProduct(data);
                } else {
                    setError("Product not found");
                }
            } catch {
                setError("Failed to fetch product");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    return { product, loading, error };
};
