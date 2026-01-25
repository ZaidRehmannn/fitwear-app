import AppVersion from "@/components/profile/AppVersion";
import LogoutButton from "@/components/profile/LogoutButton";
import MenuList from "@/components/profile/MenuList";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import StatsSection from "@/components/profile/StatsSection";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useImagePicker } from "@/hooks/useImagePicker";
import { useUser } from "@/hooks/useUser";
import { logoutUser } from "@/services/authService";
import { MENU_ITEMS } from "@/utils/data/profileData";
import { formatDate } from "@/utils/helpers";
import { showToast } from "@/utils/toast";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
    const router = useRouter();
    const { userData } = useAuth();
    const { updateName, updatePicture, removePicture } = useUser();
    const [isUploading, setIsUploading] = useState(false);
    const { pickImage } = useImagePicker();
    const { wishlist } = useWishlist();

    const userStats = [
        { label: "Orders", value: "0" },
        { label: "Wishlist", value: wishlist.length.toString() }
    ];

    const handleMenuItemPress = (route: string) => {
        router.push(route as any);
    };

    const handleSaveName = async (newName: string) => {
        try {
            await updateName(newName);
            showToast("success", "Name updated successfully!");
        } catch (error) {
            showToast("error", "Failed to update profile.");
            throw error;
        }
    };

    const handlePickImage = async (mode: 'camera' | 'library') => {
        try {
            const result = await pickImage(mode);
            if (result && !result.canceled) {
                setIsUploading(true);
                await updatePicture(result.assets[0].uri);
                showToast("success", "Profile picture updated!");
            }
        } catch (error) {
            showToast("error", "Upload failed.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageSourceSelection = () => {
        if (isUploading) return;

        const options: Array<{ text: string; onPress?: () => void | Promise<void>; style?: 'default' | 'cancel' | 'destructive' }> = [
            { text: "Take Photo", onPress: () => handlePickImage('camera') },
            { text: "Choose from Gallery", onPress: () => handlePickImage('library') },
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
            await removePicture();
            showToast("success", "Profile picture removed.");
        } catch (error) {
            showToast("error", "Failed to remove image.");
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

                <StatsSection stats={userStats} />

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