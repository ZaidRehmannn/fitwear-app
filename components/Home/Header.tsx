import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Header = () => {
    return (
        <View style={styles.header}>
            <View>
                <Text style={styles.title}>FitWear</Text>
                <Text style={styles.subtitle}>Style that speaks for you</Text>
            </View>
            <View style={styles.headerActions}>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="search-outline" size={24} color={colors.navy} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="bag-outline" size={24} color={colors.navy} />
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>2</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Header;

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
        fontWeight: "800",
        color: colors.navy,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 2,
    },
    headerActions: {
        flexDirection: "row",
        gap: 8,
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