import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EditNameModal from "./EditNameModal";

interface ProfileHeaderProps {
    currentName: string;
    onSaveName: (newName: string) => Promise<void>;
}

const ProfileHeader = ({ currentName, onSaveName }: ProfileHeaderProps) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.header}>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Ionicons name="create" size={22} color="#1B3B5D" />
            </TouchableOpacity>

            <EditNameModal
                visible={modalVisible}
                currentName={currentName}
                onClose={() => setModalVisible(false)}
                onSave={onSaveName}
            />
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