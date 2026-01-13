import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ShopHeaderProps {
    onCartPress: () => void;
}

const ShopHeader = ({ onCartPress }: ShopHeaderProps) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Shop</Text>
            <TouchableOpacity style={styles.iconButton} onPress={onCartPress}>
                <Ionicons name="bag-outline" size={24} color={colors.navy} />
                <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>2</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ShopHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#1B3B5D",
    },
    iconButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: colors.navy,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },
    cartBadge: {
        position: "absolute",
        top: -2,
        right: -2,
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: colors.cyan,
        alignItems: "center",
        justifyContent: "center",
    },
    cartBadgeText: {
        fontSize: 10,
        fontWeight: "700",
        color: colors.navyDark,
    },
});