import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface LogoutButtonProps {
    onLogout: () => void;
}

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
    return (
        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
            <Ionicons name="log-out" size={20} color="#ff4757" />
            <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
    );
};

export default LogoutButton;

const styles = StyleSheet.create({
    logoutBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 20,
        marginTop: 24,
        paddingVertical: 16,
        backgroundColor: "#fff5f5",
        borderRadius: 14,
        gap: 10,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#ff4757",
    },
});