import { db } from "@/config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export interface PromoCode {
    code: string;
    type: "percentage" | "flat";
    value: number;
}

export const getPromoCode = async (code: string): Promise<PromoCode | null> => {
    const q = query(
        collection(db, "promo_codes"),
        where("code", "==", code)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    return snapshot.docs[0].data() as PromoCode;
};
