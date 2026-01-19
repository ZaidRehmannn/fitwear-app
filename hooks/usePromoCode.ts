import { useCart } from "@/context/CartContext";
import { useState } from "react";

export const usePromoCode = () => {
    const { applyPromoCode } = useCart();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const applyCode = async (code: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await applyPromoCode(code);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Failed to apply promo code");
        } finally {
            setLoading(false);
        }
    };

    return {
        applyCode,
        loading,
        error,
        success,
    };
};
