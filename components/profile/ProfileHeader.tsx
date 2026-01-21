import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProfileHeaderProps {
    onEdit: () => void;
}

const ProfileHeader = ({ onEdit }: ProfileHeaderProps) => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity onPress={onEdit}>
                <Ionicons name="create" size={22} color="#1B3B5D" />
            </TouchableOpacity>
        </View>
    );
};

export default ProfileHeader;

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
});