import { auth, db } from '@/config/firebase';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    serverTimestamp,
    where
} from 'firebase/firestore';

export const orderService = {
    async getUserOrders() {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("User not authenticated");

            const q = query(
                collection(db, "orders"),
                where("userId", "==", user.uid),
                orderBy("createdAt", "desc")
            );

            const querySnapshot = await getDocs(q);
            return querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
                };
            });
        } catch (error) {
            console.error("Error in getUserOrders:", error);
            return [];
        }
    },

    async fetchSavedAddresses() {
        const user = auth.currentUser;
        if (!user) return [];

        const q = query(
            collection(db, "saved_addresses"),
            where("userId", "==", user.uid),
            orderBy("createdAt", "desc"),
            limit(5)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    async saveNewAddress(addressDetails: any) {
        const user = auth.currentUser;
        if (!user) throw new Error("User not found");

        return await addDoc(collection(db, "saved_addresses"), {
            ...addressDetails,
            userId: user.uid,
            createdAt: serverTimestamp(),
        });
    },

    async placeOrder(orderData: any) {
        const user = auth.currentUser;
        if (!user) throw new Error("User not found");

        return await addDoc(collection(db, "orders"), {
            ...orderData,
            userId: user.uid,
            createdAt: serverTimestamp(),
        });
    },

    async getOrderById(orderId: string) {
        try {
            const docRef = doc(db, "orders", orderId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }
            return null;
        } catch (error) {
            console.error("Error fetching order:", error);
            throw error;
        }
    }
};