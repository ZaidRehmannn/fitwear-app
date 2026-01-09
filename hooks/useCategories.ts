import { getCategories } from "@/services/categoryService";
import { useEffect, useState } from "react";

export const useCategories = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (err) {
                console.error("Failed to load categories", err);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return { categories, loading };
};
