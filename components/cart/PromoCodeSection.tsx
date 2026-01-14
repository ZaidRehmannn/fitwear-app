import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PromoCodeSectionProps {
    onApply: (code: string) => void;
}

const PromoCodeSection = ({ onApply }: PromoCodeSectionProps) => {
    return (
        <View style={styles.promoSection}>
            <View style={styles.promoInputWrapper}>
                <Ionicons name="pricetag" size={20} color="#888" />
                <Text style={styles.promoPlaceholder}>Enter promo code</Text>
            </View>
            <TouchableOpacity style={styles.applyBtn} onPress={() => onApply("")}>
                <Text style={styles.applyBtnText}>Apply</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PromoCodeSection;

const styles = StyleSheet.create({
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
});