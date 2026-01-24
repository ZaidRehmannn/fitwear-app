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
            <View style={styles.avatarWrapper}>
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
                </TouchableOpacity>

                {!isUploading && (
                    <TouchableOpacity
                        onPress={onImagePress}
                        style={styles.cameraBadge}
                        activeOpacity={0.9}
                    >
                        <Ionicons name="camera" size={14} color="#fff" />
                    </TouchableOpacity>
                )}
            </View>

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
    avatarWrapper: {
        position: 'relative',
        width: 80,
        height: 80,
    },
    avatarContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#00cfff",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        overflow: 'hidden',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
    },
    cameraBadge: {
        position: 'absolute',
        bottom: -2,
        right: -2,
        backgroundColor: '#1B3B5D',
        padding: 6,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
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