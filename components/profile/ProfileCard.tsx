import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface ProfileCardProps {
    name: string;
    email: string;
}

const ProfileCard = ({ name, email }: ProfileCardProps) => {
    return (
        <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
                <Ionicons name="person" size={42} color="#00cfff" />
            </View>

            <View style={styles.profileInfo}>
                <Text style={styles.userName}>{name}</Text>
                <Text style={styles.userEmail}>{email}</Text>
            </View>
        </View>
    );
};

export default ProfileCard;

const styles = StyleSheet.create({
    profileCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: "#f8fafc",
        borderRadius: 20,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#00cfff",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    profileInfo: {
        marginLeft: 16,
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#1B3B5D",
    },
    userEmail: {
        fontSize: 14,
        color: "#888",
        marginTop: 2,
    },
});
