import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProfileCardProps {
    name: string;
    email: string;
    joinedDate: string;
    profilePic?: string;
    onImagePress: () => void;
    isUploading: boolean;
}

const ProfileCard = ({ name, email, joinedDate, profilePic, onImagePress, isUploading }: ProfileCardProps) => {
    return (
        <View style={styles.profileCard}>
            <TouchableOpacity
                onPress={onImagePress}
                disabled={isUploading}
                activeOpacity={0.7}
                style={styles.avatarContainer}
            >
                {isUploading ? (
                    <ActivityIndicator size="small" color="#00cfff" />
                ) : profilePic ? (
                    <Image source={{ uri: profilePic }} style={styles.avatarImage} />
                ) : (
                    <Ionicons name="person" size={42} color="#00cfff" />
                )}

                {!isUploading && (
                    <View style={styles.cameraBadge}>
                        <Ionicons name="camera" size={12} color="#fff" />
                    </View>
                )}
            </TouchableOpacity>

            <View style={styles.profileInfo}>
                <Text style={styles.userName}>{name}</Text>
                <Text style={styles.userEmail}>{email}</Text>

                <View style={styles.joinedContainer}>
                    <Ionicons name="calendar-outline" size={12} color="#888" />
                    <Text style={styles.joinedText}>Joined {joinedDate}</Text>
                </View>
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
        position: 'relative',
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#1B3B5D',
        padding: 4,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: '#fff',
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
    joinedContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
        gap: 4,
    },
    joinedText: {
        fontSize: 12,
        color: "#888",
    },
});