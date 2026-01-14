import { StyleSheet, Text, View } from "react-native";

interface CartHeaderProps {
    itemCount: number;
}

const CartHeader = ({ itemCount }: CartHeaderProps) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>My Cart</Text>
            <Text style={styles.itemCount}>{itemCount} items</Text>
        </View>
    );
};

export default CartHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#f0f0f0",
    },
    title: {
        flex: 1,
        fontSize: 24,
        fontWeight: "bold",
        color: "#1B3B5D",
    },
    itemCount: {
        fontSize: 14,
        color: "#888",
    },
});