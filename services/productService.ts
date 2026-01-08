import { db } from "@/config/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export const getProducts = async (): Promise<Product[]> => {
    try {
        const productsRef = collection(db, "products");
        const q = query(productsRef);

        const snapshot = await getDocs(q);

        const products: Product[] = snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<Product, "id">),
        }));

        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};
