import { Product } from "@/services/productService";
import { getPromoCode, PromoCode } from "@/services/promoService";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

export interface CartItem extends Product {
    quantity: number;
}

interface CartTotals {
    subtotal: number;
    shipping: number;
    total: number;
    discount: number;
}

interface CartContextType {
    cartItems: CartItem[];
    totals: CartTotals;
    addToCart: (product: Product, quantity?: number) => void;
    updateQuantity: (productId: string, delta: number) => void;
    removeFromCart: (productId: string) => void;
    cartQuantity: () => number;
    applyPromoCode: (code: string) => Promise<void>;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [promo, setPromo] = useState<PromoCode | null>(null);

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

    const cartQuantity = (): number => {
        return cartItems.length;
    };

    const applyPromoCode = async (code: string) => {
        const promoData = await getPromoCode(code);

        if (!promoData) {
            throw new Error("Invalid Promo Code!");
        }

        setPromo(promoData);
    };

    const clearCart = () => {
        setCartItems([]);
        setPromo(null);
    };

    const totals = useMemo<CartTotals>(() => {
        const subtotal = cartItems.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );

        const shipping = subtotal > 100 || subtotal === 0 ? 0 : 9.99;

        let discount = 0;
        if (promo) {
            discount =
                promo.type === "percentage"
                    ? (subtotal * promo.value) / 100
                    : promo.value;
        }

        const total = Math.max(0, subtotal + shipping - discount);

        return { subtotal, shipping, total, discount };
    }, [cartItems, promo]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                totals,
                addToCart,
                updateQuantity,
                removeFromCart,
                cartQuantity,
                applyPromoCode,
                clearCart
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
