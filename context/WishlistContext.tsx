import { db } from '@/config/firebase';
import { toggleWishlistInDb } from '@/services/wishlistService';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

interface WishlistContextType {
    wishlist: string[];
    toggleWishlist: (productId: string) => Promise<void>;
    isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [wishlist, setWishlist] = useState<string[]>([]);

    useEffect(() => {
        if (!user) {
            setWishlist([]);
            return;
        }

        const userRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(userRef, (doc) => {
            if (doc.exists()) {
                setWishlist(doc.data().wishlist || []);
            }
        });

        return () => unsubscribe();
    }, [user]);

    const handleToggle = async (productId: string) => {
        if (!user) return;

        const isAdding = !wishlist.includes(productId);

        try {
            await toggleWishlistInDb(user.uid, productId, isAdding);
        } catch (error) {
            console.error("Wishlist sync failed:", error);
        }
    };

    const isInWishlist = (productId: string) => wishlist.includes(productId);

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist: handleToggle, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
    return context;
};