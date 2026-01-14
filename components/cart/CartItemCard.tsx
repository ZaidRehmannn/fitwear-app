import { CartItem, useCart } from "@/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CartItemCardProps {
    item: CartItem;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
    const { updateQuantity, removeFromCart } = useCart();

    return (
        <View style={styles.cartItem}>
            {/* product image */}
            <Image source={{ uri: item.image }} style={styles.itemImage} />

            {/* product info */}
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.title}</Text>
                <Text style={styles.itemVariant}>
                    {item.category}
                </Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
            </View>

            <View style={styles.itemActions}>
                {/* remove product button */}
                <TouchableOpacity
                    onPress={() => removeFromCart(item.id)}
                    style={styles.removeBtn}
                >
                    <Ionicons name="trash-outline" size={18} color="#ff4757" />
                </TouchableOpacity>

                {/* product quantity buttons */}
                <View style={styles.quantityControl}>
                    <TouchableOpacity
                        onPress={() => updateQuantity(item.id, -1)}
                        style={styles.qtyBtn}
                    >
                        <Ionicons name="remove" size={16} color="#1B3B5D" />
                    </TouchableOpacity>

                    <Text style={styles.qtyText}>{item.quantity}</Text>

                    <TouchableOpacity
                        onPress={() => updateQuantity(item.id, 1)}
                        style={styles.qtyBtn}
                    >
                        <Ionicons name="add" size={16} color="#1B3B5D" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default CartItemCard;

const styles = StyleSheet.create({
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
});