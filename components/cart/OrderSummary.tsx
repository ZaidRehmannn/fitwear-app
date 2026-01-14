import { useCart } from "@/context/CartContext";
import { StyleSheet, Text, View } from "react-native";

const OrderSummary = () => {
    const { totals } = useCart();
    const { subtotal, shipping, total } = totals;

    return (
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
    );
};

export default OrderSummary;

const styles = StyleSheet.create({
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
});