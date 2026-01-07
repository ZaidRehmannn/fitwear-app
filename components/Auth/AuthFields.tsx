import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export interface Field {
    name: string;
    placeholder: string;
    secure?: boolean;
    value: string;
    onChangeText: (text: string) => void;
}

interface AuthFieldsProps {
    fields: Field[];
}

const AuthFields: React.FC<AuthFieldsProps> = ({ fields }) => {
    const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

    const togglePassword = (name: string) => {
        setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    return (
        <View style={styles.container}>
            {fields.map((field) => (
                <View key={field.name} style={styles.fieldContainer}>
                    <TextInput
                        placeholder={field.placeholder}
                        placeholderTextColor="#ddd"
                        value={field.value}
                        onChangeText={field.onChangeText}
                        secureTextEntry={field.secure ? !showPassword[field.name] : false}
                        style={[styles.input, field.secure && { paddingRight: 50 }]}
                    />
                    {field.secure && (
                        <TouchableOpacity
                            style={styles.eyeIcon}
                            onPress={() => togglePassword(field.name)}
                        >
                            <Ionicons
                                name={showPassword[field.name] ? "eye" : "eye-off"}
                                size={24}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    )}
                </View>
            ))}
        </View>
    );
};

export default AuthFields;

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
    },
    fieldContainer: {
        position: "relative",
        justifyContent: "center",
        marginTop: 16,
    },
    input: {
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        borderRadius: 12,
        padding: 16,
        color: "#fff",
        fontSize: 16,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.4)",
    },
    eyeIcon: {
        position: "absolute",
        right: 16,
        top: 14,
    },
});
