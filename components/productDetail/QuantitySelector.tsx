import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface QuantitySelectorProps {
    quantity: number;
    onIncrement: () => void;
    onDecrement: () => void;
}

const QuantitySelector = ({ quantity, onIncrement, onDecrement }: QuantitySelectorProps) => {
    return (
        <View style={styles.optionSection}>
            <Text style={styles.optionTitle}>Quantity</Text>
            <View style={styles.quantityRow}>
                <TouchableOpacity style={styles.quantityBtn} onPress={onDecrement}>
                    <Ionicons name="remove" size={20} color="#1B3B5D" />
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity}</Text>
                <TouchableOpacity style={styles.quantityBtn} onPress={onIncrement}>
                    <Ionicons name="add" size={20} color="#1B3B5D" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default QuantitySelector;

const styles = StyleSheet.create({
    optionSection: {
        paddingHorizontal: 24,
    },
    optionTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1B3B5D",
        marginBottom: 12,
    },
    quantityRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
    },
    quantityBtn: {
        width: 44,
        height: 44,
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    quantityText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1B3B5D",
        minWidth: 30,
        textAlign: "center",
    },
});