import { db } from "@/config/firebase";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export interface Product {
    id: string;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

export const getAllProducts = async (): Promise<Product[]> => {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
    }));
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("category", "==", category));
    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
    }));
};

export const getProductById = async (id: string): Promise<Product | null> => {
    const productRef = doc(db, "products", id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) return null;

    return {
        id: snapshot.id,
        ...(snapshot.data() as Omit<Product, "id">),
    };
};
