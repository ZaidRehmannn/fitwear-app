import { Product } from "@/services/productService";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export interface CartItem extends Product {
    quantity: number;
}

interface CartTotals {
    subtotal: number;
    shipping: number;
    total: number;
}

interface CartContextType {
    cartItems: CartItem[];
    totals: CartTotals;
    addToCart: (product: Product, quantity?: number) => void;
    updateQuantity: (productId: string, delta: number) => void;
    removeFromCart: (productId: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    const modifyItemQuantity = (product: Product, delta: number) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === product.id);

            if (existing) {
                const newQty = existing.quantity + delta;

                if (newQty <= 0) {
                    return prev.filter(i => i.id !== product.id);
                }

                return prev.map(i =>
                    i.id === product.id
                        ? { ...i, quantity: newQty }
                        : i
                );
            }

            if (delta > 0) {
                return [...prev, { ...product, quantity: delta }];
            }

            return prev;
        });
    };

    const addToCart = (product: Product, quantity = 1) => {
        modifyItemQuantity(product, quantity);
    };

    const updateQuantity = (productId: string, delta: number) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === productId
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeFromCart = (productId: string) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };

    const totals = useMemo<CartTotals>(() => {
        const subtotal = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;
        const total = subtotal + shipping;

        return { subtotal, shipping, total };
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                totals,
                addToCart,
                updateQuantity,
                removeFromCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside CartProvider");
    return context;
};
