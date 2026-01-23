import React, { useEffect, useState } from "react";
import {
    ActivityIndicator, KeyboardAvoidingView,
    Modal,
    Platform,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View
} from "react-native";

interface EditNameModalProps {
    visible: boolean;
    currentName: string;
    onClose: () => void;
    onSave: (newName: string) => Promise<void>;
}

const EditNameModal = ({ visible, currentName, onClose, onSave }: EditNameModalProps) => {
    const [name, setName] = useState(currentName);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (visible) setName(currentName);
    }, [visible, currentName]);

    const handleSave = async () => {
        if (!name.trim() || name === currentName) {
            onClose();
            return;
        }

        setLoading(true);
        try {
            await onSave(name.trim());
            onClose();
        } catch (error) {
            // Parent handles the toast error
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.overlay}
            >
                <View style={styles.container}>
                    <Text style={styles.title}>Update Name</Text>

                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="Full Name"
                        autoFocus
                        placeholderTextColor="#999"
                    />

                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={onClose}
                            disabled={loading}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.saveBtn}
                            onPress={handleSave}
                            disabled={loading || !name.trim()}
                        >
                            {loading ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <Text style={styles.saveText}>Save Changes</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default EditNameModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        padding: 20,
    },
    container: {
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
        color: "#1B3B5D",
    },
    input: {
        backgroundColor: "#f5f6fa",
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: "#1B3B5D",
        marginBottom: 24,
        borderWidth: 1,
        borderColor: "#eee",
    },
    buttonGroup: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 15,
    },
    cancelBtn: {
        paddingVertical: 10,
    },
    cancelText: {
        color: "#666",
        fontWeight: "600",
        fontSize: 15,
    },
    saveBtn: {
        backgroundColor: "#1B3B5D",
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 20,
        minWidth: 120,
        alignItems: "center",
    },
    saveText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 15,
    },
});