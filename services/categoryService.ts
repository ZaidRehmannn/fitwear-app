import { db } from "@/config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getCategories = async (): Promise<string[]> => {
    const snapshot = await getDocs(collection(db, "products"));

    const categoriesSet = new Set<string>();

    snapshot.docs.forEach(doc => {
        const data = doc.data();
        if (data.category) {
            categoriesSet.add(data.category);
        }
    });

    return Array.from(categoriesSet);
};
