import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CheckoutBarProps {
    onCheckout: () => void;
}

const CheckoutBar = ({ onCheckout }: CheckoutBarProps) => {
    return (
        <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.checkoutBtn} onPress={onCheckout}>
                <Text style={styles.checkoutText}>Checkout</Text>
                <Ionicons name="arrow-forward" size={20} color="#0D1B2A" />
            </TouchableOpacity>
        </View>
    );
};

export default CheckoutBar;

const styles = StyleSheet.create({
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