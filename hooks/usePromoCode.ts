import { auth } from "@/config/firebase";
import { useCart } from "@/context/CartContext";
import { orderService } from "@/services/orderService";
import { getPromoCode } from "@/services/promoService";
import { useState } from "react";

export const usePromoCode = () => {
    const { applyPromoCode, totals, clearPromoCode } = useCart();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const applyCode = async (code: string) => {
        if (!code.trim()) return;

        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const promo = await getPromoCode(code);

            if (!promo) {
                throw new Error("Invalid or expired promo code.");
            }

            if (totals.subtotal < promo.minAmount) {
                throw new Error(`This code requires a minimum order of $${promo.minAmount}.`);
            }

            if (promo.isFirstOrderOnly) {
                const user = auth.currentUser;
                if (!user) {
                    throw new Error("Please login to use this promo code.");
                }

                const firstOrderEligible = await orderService.isFirstOrder(user.uid);
                if (!firstOrderEligible) {
                    throw new Error("This code is only valid for your first order.");
                }
            }

            await applyPromoCode(promo);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || "Failed to apply promo code");
            console.error("Promo Error:", err);
        } finally {
            setLoading(false);
        }
    };

    const removeCode = () => {
        clearPromoCode();
        setSuccess(false);
        setError(null);
    };

    return {
        applyCode,
        removeCode,
        loading,
        error,
        success,
    };
};