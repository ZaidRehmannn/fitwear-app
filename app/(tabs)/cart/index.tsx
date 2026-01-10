import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
}

const INITIAL_CART: CartItem[] = [
    {
        id: "1",
        name: "Classic Navy Tee",
        price: 39,
        quantity: 2,
        size: "M",
        color: "Navy",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300",
    },
    {
        id: "2",
        name: "Slim Fit Chinos",
        price: 69,
        quantity: 1,
        size: "32",
        color: "Khaki",
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=300",
    },
];

const Cart = () => {
    const router = useRouter();
    const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
    const [promoCode, setPromoCode] = useState("");

    const updateQuantity = (id: string, delta: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const total = subtotal + shipping;

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Feather name="arrow-left" size={24} color="#1B3B5D" />
                </TouchableOpacity>
                <Text style={styles.title}>My Cart</Text>
                <Text style={styles.itemCount}>{cartItems.length} items</Text>
            </View>

            {cartItems.length === 0 ? (
                <View style={styles.emptyCart}>
                    <Feather name="shopping-bag" size={64} color="#ccc" />
                    <Text style={styles.emptyTitle}>Your cart is empty</Text>
                    <Text style={styles.emptySubtitle}>Add items to start shopping</Text>
                    <TouchableOpacity
                        style={styles.shopNowBtn}
                        onPress={() => router.push("/(tabs)/shop")}
                    >
                        <Text style={styles.shopNowText}>Shop Now</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <>
                    <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
                        {/* Cart Items */}
                        {cartItems.map((item) => (
                            <View key={item.id} style={styles.cartItem}>
                                <Image source={{ uri: item.image }} style={styles.itemImage} />
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemVariant}>
                                        {item.size} • {item.color}
                                    </Text>
                                    <Text style={styles.itemPrice}>${item.price}</Text>
                                </View>
                                <View style={styles.itemActions}>
                                    <TouchableOpacity
                                        onPress={() => removeItem(item.id)}
                                        style={styles.removeBtn}
                                    >
                                        <Feather name="trash-2" size={18} color="#ff4757" />
                                    </TouchableOpacity>
                                    <View style={styles.quantityControl}>
                                        <TouchableOpacity
                                            onPress={() => updateQuantity(item.id, -1)}
                                            style={styles.qtyBtn}
                                        >
                                            <Feather name="minus" size={16} color="#1B3B5D" />
                                        </TouchableOpacity>
                                        <Text style={styles.qtyText}>{item.quantity}</Text>
                                        <TouchableOpacity
                                            onPress={() => updateQuantity(item.id, 1)}
                                            style={styles.qtyBtn}
                                        >
                                            <Feather name="plus" size={16} color="#1B3B5D" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}

                        {/* Promo Code */}
                        <View style={styles.promoSection}>
                            <View style={styles.promoInputWrapper}>
                                <Feather name="tag" size={20} color="#888" />
                                <Text style={styles.promoPlaceholder}>Enter promo code</Text>
                            </View>
                            <TouchableOpacity style={styles.applyBtn}>
                                <Text style={styles.applyBtnText}>Apply</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Order Summary */}
                        <View style={styles.summarySection}>
                            <Text style={styles.summaryTitle}>Order Summary</Text>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Subtotal</Text>
                                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Shipping</Text>
                                <Text style={styles.summaryValue}>
                                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                                </Text>
                            </View>
                            {shipping > 0 && (
                                <Text style={styles.freeShippingHint}>
                                    Add ${(100 - subtotal).toFixed(2)} more for free shipping
                                </Text>
                            )}
                            <View style={[styles.summaryRow, styles.totalRow]}>
                                <Text style={styles.totalLabel}>Total</Text>
                                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                            </View>
                        </View>
                    </ScrollView>

                    {/* Checkout Button */}
                    <View style={styles.bottomBar}>
                        <TouchableOpacity style={styles.checkoutBtn}>
                            <Text style={styles.checkoutText}>Checkout</Text>
                            <Feather name="arrow-right" size={20} color="#0D1B2A" />
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

export default Cart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    backBtn: {
        marginRight: 16,
    },
    title: {
        flex: 1,
        fontSize: 22,
        fontWeight: "bold",
        color: "#1B3B5D",
    },
    itemCount: {
        fontSize: 14,
        color: "#888",
    },
    scrollView: {
        flex: 1,
    },
    emptyCart: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1B3B5D",
        marginTop: 20,
    },
    emptySubtitle: {
        fontSize: 15,
        color: "#888",
        marginTop: 8,
    },
    shopNowBtn: {
        marginTop: 30,
        backgroundColor: "#00cfff",
        paddingHorizontal: 32,
        paddingVertical: 14,
        borderRadius: 12,
    },
    shopNowText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0D1B2A",
    },
    cartItem: {
        flexDirection: "row",
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    itemImage: {
        width: 90,
        height: 90,
        borderRadius: 12,
        backgroundColor: "#f5f5f5",
    },
    itemInfo: {
        flex: 1,
        marginLeft: 14,
        justifyContent: "center",
    },
    itemName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1B3B5D",
    },
    itemVariant: {
        fontSize: 13,
        color: "#888",
        marginTop: 4,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#00cfff",
        marginTop: 6,
    },
    itemActions: {
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    removeBtn: {
        padding: 8,
    },
    quantityControl: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 10,
        padding: 4,
    },
    qtyBtn: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },
    qtyText: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#1B3B5D",
        minWidth: 28,
        textAlign: "center",
    },
    promoSection: {
        flexDirection: "row",
        alignItems: "center",
        margin: 20,
        gap: 12,
    },
    promoInputWrapper: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 50,
        gap: 10,
    },
    promoPlaceholder: {
        color: "#888",
        fontSize: 14,
    },
    applyBtn: {
        backgroundColor: "#1B3B5D",
        paddingHorizontal: 24,
        height: 50,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    applyBtnText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 14,
    },
    summarySection: {
        margin: 20,
        padding: 20,
        backgroundColor: "#f8fafc",
        borderRadius: 16,
    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1B3B5D",
        marginBottom: 16,
    },
    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    summaryLabel: {
        fontSize: 14,
        color: "#666",
    },
    summaryValue: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1B3B5D",
    },
    freeShippingHint: {
        fontSize: 12,
        color: "#00cfff",
        marginBottom: 12,
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: "#e0e0e0",
        paddingTop: 12,
        marginTop: 4,
        marginBottom: 0,
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1B3B5D",
    },
    totalValue: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1B3B5D",
    },
    bottomBar: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: "#f0f0f0",
    },
    checkoutBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#00cfff",
        paddingVertical: 18,
        borderRadius: 14,
        gap: 10,
    },
    checkoutText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0D1B2A",
    },
});
