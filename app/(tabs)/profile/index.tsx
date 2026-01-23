import AppVersion from "@/components/profile/AppVersion";
import LogoutButton from "@/components/profile/LogoutButton";
import MenuList from "@/components/profile/MenuList";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import StatsSection from "@/components/profile/StatsSection";
import { useAuth } from "@/context/AuthContext";
import { logoutUser } from "@/services/authService";
import { formatDate } from "@/utils/helpers";
import { showToast } from "@/utils/toast";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
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
    const { userData, updateProfile, updateProfilePic, deleteProfilePic } = useAuth();
    const [isUploading, setIsUploading] = useState(false);

    const handleMenuItemPress = (route: string) => {
        router.push(route as any);
    };

    const handleSaveName = async (newName: string) => {
        try {
            await updateProfile(newName);
            showToast("success", "Name updated successfully!");
        } catch (error) {
            showToast("error", "Failed to update profile.");
            throw error;
        }
    };

    const handleImageSourceSelection = () => {
        if (isUploading) return;

        const options: Array<{ text: string; onPress?: () => void | Promise<void>; style?: 'default' | 'cancel' | 'destructive' }> = [
            { text: "Take Photo", onPress: () => pickImage('camera') },
            { text: "Choose from Gallery", onPress: () => pickImage('library') },
        ];

        if (userData?.profilePic) {
            options.push({
                text: "Remove Current Photo",
                onPress: handleRemoveImage,
                style: "destructive"
            });
        }

        options.push({ text: "Cancel", style: "cancel" });

        Alert.alert("Profile Picture", "Update your photo", options);
    };

    const handleRemoveImage = async () => {
        try {
            setIsUploading(true);
            await deleteProfilePic();
            showToast("success", "Profile picture removed.");
        } catch (error) {
            showToast("error", "Failed to remove image.");
        } finally {
            setIsUploading(false);
        }
    };

    const pickImage = async (mode: 'camera' | 'library') => {
        let result;

        try {
            if (mode === 'camera') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    showToast("error", "Camera access is required.");
                    return;
                }
                result = await ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.5,
                });
            } else {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    showToast("error", "Gallery access is required.");
                    return;
                }
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ['images'],
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 0.5,
                });
            }

            if (!result.canceled) {
                setIsUploading(true);
                await updateProfilePic(result.assets[0].uri);
                showToast("success", "Profile picture updated!");
            }
        } catch (error) {
            showToast("error", "Failed to upload image.");
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            showToast("error", "Failed to log out.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <ProfileHeader
                    currentName={userData?.name || ""}
                    onSaveName={handleSaveName}
                />

                <ProfileCard
                    name={userData?.name || "User"}
                    email={userData?.email || "Email"}
                    joinedDate={formatDate(userData?.createdAt)}
                    profilePic={userData?.profilePic}
                    onImagePress={handleImageSourceSelection}
                    isUploading={isUploading}
                />

                <StatsSection stats={USER_STATS} />

                <MenuList
                    items={MENU_ITEMS}
                    onItemPress={handleMenuItemPress}
                />

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
    }
});