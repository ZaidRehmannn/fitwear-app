import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BottomBarProps {
    totalPrice: number;
    onAddToCart: () => void;
    disabled: boolean;
}

const BottomBar = ({ totalPrice, onAddToCart, disabled }: BottomBarProps) => {
    return (
        <View style={styles.bottomBar}>
            <View style={styles.totalSection}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalPrice}>${totalPrice}</Text>
            </View>

            <TouchableOpacity
                style={[
                    styles.addToCartBtn,
                    disabled && styles.disabledBtn
                ]}
                onPress={onAddToCart}
                disabled={disabled}
                activeOpacity={0.7}
            >
                <Ionicons
                    name="bag"
                    size={20}
                    color={disabled ? "#888" : "#0D1B2A"}
                />
                <Text
                    style={[
                        styles.addToCartText,
                        disabled && styles.disabledText
                    ]}
                >
                    {disabled ? "Added" : "Add to Cart"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default BottomBar;

const styles = StyleSheet.create({
    bottomBar: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 24,
        paddingVertical: 16,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#eee",
        gap: 20,
        marginTop: 25,
    },
    totalSection: {
        flex: 1,
    },
    totalLabel: {
        fontSize: 12,
        color: "#888",
    },
    totalPrice: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#1B3B5D",
    },
    addToCartBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#00cfff",
        paddingHorizontal: 28,
        paddingVertical: 16,
        borderRadius: 14,
        gap: 10,
    },
    addToCartText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0D1B2A",
    },
    disabledBtn: {
        backgroundColor: "#e5e7eb",
    },
    disabledText: {
        color: "#888",
    },
});