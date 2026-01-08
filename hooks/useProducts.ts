import { Product, getProducts } from "@/services/productService";
import { useEffect, useState } from "react";

interface UseProductsProps {
    category?: string;
}

export const useProducts = ({ category }: UseProductsProps = {}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);
            try {
                const allProducts = await getProducts();

                const filteredProducts = category
                    ? allProducts.filter(p => p.category === category)
                    : allProducts;

                setProducts(filteredProducts);
            } catch (err: any) {
                console.error(err);
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [category]);

    return { products, loading, error };
};
