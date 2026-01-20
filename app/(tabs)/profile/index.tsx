import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MENU_ITEMS = [
    { icon: "package", label: "My Orders", route: "/orders" },
    { icon: "heart", label: "Wishlist", route: "/wishlist" },
    { icon: "map-pin", label: "Shipping Address", route: "/address" },
    { icon: "credit-card", label: "Payment Methods", route: "/payment" },
    { icon: "bell", label: "Notifications", route: "/notifications" },
    { icon: "settings", label: "Settings", route: "/settings" },
    { icon: "help-circle", label: "Help & Support", route: "/help" },
];
// test
const Profile = () => {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Profile</Text>
                    <TouchableOpacity>
                        <Feather name="edit-2" size={22} color="#1B3B5D" />
                    </TouchableOpacity>
                </View>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200" }}
                            style={styles.avatar}
                        />
                        <View style={styles.verifiedBadge}>
                            <Feather name="check" size={12} color="#fff" />
                        </View>
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.userName}>Alex Johnson</Text>
                        <Text style={styles.userEmail}>alex.johnson@email.com</Text>
                        <View style={styles.memberBadge}>
                            <Feather name="award" size={14} color="#FFD700" />
                            <Text style={styles.memberText}>Gold Member</Text>
                        </View>
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>Orders</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>4</Text>
                        <Text style={styles.statLabel}>Wishlist</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statNumber}>$340</Text>
                        <Text style={styles.statLabel}>Rewards</Text>
                    </View>
                </View>

                {/* Menu Items */}
                <View style={styles.menuContainer}>
                    {MENU_ITEMS.map((item, index) => (
                        <TouchableOpacity
                            key={item.label}
                            style={[
                                styles.menuItem,
                                index === MENU_ITEMS.length - 1 && styles.menuItemLast,
                            ]}
                            onPress={() => router.push(item.route as any)}
                        >
                            <View style={styles.menuIconContainer}>
                                <Feather name={item.icon as any} size={20} color="#1B3B5D" />
                            </View>
                            <Text style={styles.menuLabel}>{item.label}</Text>
                            <Feather name="chevron-right" size={20} color="#ccc" />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutBtn}>
                    <Feather name="log-out" size={20} color="#ff4757" />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>

                {/* App Version */}
                <Text style={styles.version}>FitWear v1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
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
    profileCard: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: "#f8fafc",
        borderRadius: 20,
    },
    avatarContainer: {
        position: "relative",
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: "#00cfff",
    },
    verifiedBadge: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#00cfff",
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 3,
        borderColor: "#fff",
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
    memberBadge: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        marginTop: 10,
        alignSelf: "flex-start",
        gap: 6,
    },
    memberText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#1B3B5D",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginHorizontal: 20,
        marginTop: 24,
        paddingVertical: 20,
        backgroundColor: "#1B3B5D",
        borderRadius: 16,
    },
    statItem: {
        alignItems: "center",
    },
    statNumber: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#00cfff",
    },
    statLabel: {
        fontSize: 12,
        color: "#a0aec0",
        marginTop: 4,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: "#2d4a6a",
    },
    menuContainer: {
        marginTop: 24,
        marginHorizontal: 20,
        backgroundColor: "#f8fafc",
        borderRadius: 16,
        overflow: "hidden",
    },
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
    version: {
        textAlign: "center",
        fontSize: 12,
        color: "#ccc",
        marginTop: 24,
        marginBottom: 40,
    },
});
