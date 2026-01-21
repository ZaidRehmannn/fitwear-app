import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MenuItemCardProps {
    icon: string;
    label: string;
    onPress: () => void;
    isLast?: boolean;
}

const MenuItemCard = ({ icon, label, onPress, isLast = false }: MenuItemCardProps) => {
    return (
        <TouchableOpacity
            style={[styles.menuItem, isLast && styles.menuItemLast]}
            onPress={onPress}
        >
            <View style={styles.menuIconContainer}>
                <Feather name={icon as any} size={20} color="#1B3B5D" />
            </View>
            <Text style={styles.menuLabel}>{label}</Text>
            <Feather name="chevron-right" size={20} color="#ccc" />
        </TouchableOpacity>
    );
};

export default MenuItemCard;

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    menuItemLast: {
        borderBottomWidth: 0,
    },
    menuIconContainer: {
        width: 40,
        height: 40,
        backgroundColor: "#fff",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },
    menuLabel: {
        flex: 1,
        fontSize: 15,
        fontWeight: "500",
        color: "#1B3B5D",
    },
});