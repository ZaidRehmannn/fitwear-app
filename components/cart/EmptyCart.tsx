import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface EmptyCartProps {
    onShopNow: () => void;
}

const EmptyCart = ({ onShopNow }: EmptyCartProps) => {
    return (
        <View style={styles.emptyCart}>
            <Ionicons name="bag" size={64} color="#ccc" />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>Add items to start shopping</Text>
            <TouchableOpacity style={styles.shopNowBtn} onPress={onShopNow}>
                <Text style={styles.shopNowText}>Shop Now</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EmptyCart;

const styles = StyleSheet.create({
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
});