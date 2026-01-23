import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LogoutButtonProps {
    onLogout: () => void;
}

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleConfirmLogout = () => {
        setModalVisible(false);
        onLogout();
    };

    return (
        <>
            {/* The Main Button */}
            <TouchableOpacity
                style={styles.logoutBtn}
                onPress={() => setModalVisible(true)}
            >
                <Ionicons name="log-out" size={20} color="#ff4757" />
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>

            {/* Confirmation Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Confirm Logout</Text>
                        <Text style={styles.modalSubtext}>Are you sure you want to log out of your account?</Text>

                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </Pressable>

                            <Pressable
                                style={[styles.button, styles.confirmButton]}
                                onPress={handleConfirmLogout}
                            >
                                <Text style={styles.confirmButtonText}>Log Out</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
        color: '#1e272e',
    },
    modalSubtext: {
        fontSize: 14,
        color: '#57606f',
        textAlign: 'center',
        marginBottom: 24,
    },
    modalButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f1f2f6',
    },
    confirmButton: {
        backgroundColor: '#ff4757',
    },
    cancelButtonText: {
        color: '#57606f',
        fontWeight: '600',
    },
    confirmButtonText: {
        color: 'white',
        fontWeight: '600',
    },
});