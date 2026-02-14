import { db } from "@/config/firebase";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

export interface PromoCode {
    code: string;
    type: "percentage" | "flat";
    value: number;
    minAmount: number;
    isFirstOrderOnly: boolean;
}

export const getPromoCode = async (code: string): Promise<PromoCode | null> => {
    const cleanCode = code.trim().toUpperCase();

    const q = query(
        collection(db, "promo_codes"),
        where("code", "==", cleanCode),
        limit(1)
    );

    try {
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return null;
        }

        const data = snapshot.docs[0].data();

        return {
            code: data.code,
            type: data.type,
            value: data.value,
            minAmount: data.minAmount || 0,
            isFirstOrderOnly: data.isFirstOrderOnly || false,
        } as PromoCode;

    } catch (error) {
        console.error("Error fetching promo code:", error);
        throw new Error("Could not verify promo code. Please try again.");
    }
};

export const getAllPromoCodes = async (): Promise<PromoCode[]> => {
    const snapshot = await getDocs(collection(db, "promo_codes"));
    return snapshot.docs.map(doc => doc.data() as PromoCode);
};