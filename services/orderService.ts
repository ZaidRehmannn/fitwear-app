import { db } from '@/config/firebase';
import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp } from 'firebase/firestore';

export const orderService = {
    async fetchSavedAddresses() {
        const q = query(
            collection(db, "saved_addresses"),
            orderBy("createdAt", "desc"),
            limit(5)
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    async saveNewAddress(addressDetails: any) {
        return await addDoc(collection(db, "saved_addresses"), {
            ...addressDetails,
            createdAt: serverTimestamp(),
        });
    },

    async placeOrder(orderData: any) {
        return await addDoc(collection(db, "orders"), {
            ...orderData,
            status: 'pending',
            createdAt: serverTimestamp(),
        });
    }
};