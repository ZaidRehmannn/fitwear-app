import AppVersion from "@/components/profile/AppVersion";
import LogoutButton from "@/components/profile/LogoutButton";
import MenuList from "@/components/profile/MenuList";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import StatsSection from "@/components/profile/StatsSection";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const MENU_ITEMS = [
    { icon: "package", label: "My Orders", route: "/orders" },
    { icon: "heart", label: "Wishlist", route: "/wishlist" },
    { icon: "map-pin", label: "Shipping Address", route: "/address" },
    { icon: "credit-card", label: "Payment Methods", route: "/payment" },
    { icon: "bell", label: "Notifications", route: "/notifications" },
    { icon: "settings", label: "Settings", route: "/settings" },
    { icon: "help-circle", label: "Help & Support", route: "/help" },
];

export const USER_STATS = [
    { label: "Orders", value: "12" },
    { label: "Wishlist", value: "4" }
];

const Profile = () => {
    const router = useRouter();

    const handleMenuItemPress = (route: string) => {
        router.push(route as any);
    };

    const handleEditProfile = () => {
        console.log("Edit profile");
    };

    const handleLogout = () => {
        console.log("Logout");
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ProfileHeader onEdit={handleEditProfile} />
                <ProfileCard
                    name="Alex Johnson"
                    email="alex.johnson@email.com"
                />
                <StatsSection stats={USER_STATS} />
                <MenuList items={MENU_ITEMS} onItemPress={handleMenuItemPress} />
                <LogoutButton onLogout={handleLogout} />
                <AppVersion />
                <View style={styles.bottomSpacer} />
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
    bottomSpacer: {
        height: 40,
    },
});