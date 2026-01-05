import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView, Platform,
    StyleSheet, Text, TextInput, TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    return (
        <LinearGradient
            colors={['#0D1B2A', '#1B3B5D']}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        style={styles.container}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <Text style={styles.title}>FitWear</Text>
                        <Text style={styles.subtitle}>Welcome back</Text>

                        <View style={styles.inputWrapper}>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor="#ddd"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                            />

                            <View style={styles.passwordContainer}>
                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor="#ddd"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!showPassword}
                                    style={[styles.input, { paddingRight: 50 }]}
                                />
                                <TouchableOpacity
                                    style={styles.eyeIcon}
                                    onPress={() => setShowPassword(!showPassword)}
                                >
                                    <Ionicons
                                        name={showPassword ? "eye" : "eye-off"}
                                        size={24}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.footer} onPress={() => router.push('/signup')}>
                            <Text style={styles.footerText}>
                                Don't have an account? <Text style={styles.signupText}>Sign up</Text>
                            </Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },
    title: {
        fontSize: 36,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 20,
        color: "#f0f0f0",
        textAlign: "center",
        marginTop: 8,
        marginBottom: 32,
    },
    inputWrapper: {
        marginTop: 16,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        color: '#fff',
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.4)',
    },
    passwordContainer: {
        position: 'relative',
        justifyContent: 'center',
    },
    eyeIcon: {
        position: 'absolute',
        right: 16,
        top: 28,
    },
    footer: {
        marginTop: 32,
        alignItems: 'center',
    },
    footerText: {
        color: '#fff',
        fontSize: 16,
    },
    signupText: {
        color: '#00cfff',
        fontWeight: 'bold',
    }
});