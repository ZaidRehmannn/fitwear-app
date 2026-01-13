import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface ProductHeaderProps {
    onBack: () => void;
    isWishlisted: boolean;
    onToggleWishlist: () => void;
}

const ProductHeader = ({ onBack, isWishlisted, onToggleWishlist }: ProductHeaderProps) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.headerBtn}>
                <Ionicons name="arrow-back" size={24} color="#1B3B5D" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onToggleWishlist} style={styles.headerBtn}>
                <Ionicons
                    name={isWishlisted ? "heart" : "heart-outline"}
                    size={24}
                    color={isWishlisted ? "#ff4757" : "#1B3B5D"}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ProductHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 12,
    },
    headerBtn: {
        width: 44,
        height: 44,
        backgroundColor: "#f5f5f5",
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
    },
});