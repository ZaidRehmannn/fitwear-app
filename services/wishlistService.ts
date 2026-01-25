import { db } from "@/config/firebase";
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

export const toggleWishlistInDb = async (uid: string, productId: string, isAdding: boolean) => {
    const userRef = doc(db, "users", uid);

    await updateDoc(userRef, {
        wishlist: isAdding ? arrayUnion(productId) : arrayRemove(productId)
    });
};

export const getWishlist = async (uid: string): Promise<string[]> => {
    const userRef = doc(db, "users", uid);
    const docSnap = await getDoc(userRef);
    return docSnap.exists() ? (docSnap.data().wishlist || []) : [];
};
