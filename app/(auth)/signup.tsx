import { signupUser } from '@/services/authService';
import { showToast } from '@/utils/toast';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView, Platform,
    ScrollView,
    StyleSheet, Text, TextInput, TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setShowPassword(false);
        setShowConfirmPassword(false);
    };

    const handleSignup = async () => {
        if (!name || !email || !password || !confirmPassword) {
            return showToast('error', 'Please fill in all fields');
        }

        if (password !== confirmPassword) {
            return showToast('error', 'Passwords do not match');
        }

        try {
            setLoading(true);

            await signupUser(name, email, password);
            showToast('success', 'Account Created Successfully!');

            resetForm();
            router.replace("/login");
        } catch (err: any) {
            console.log(err);

            if (err.code === "auth/email-already-in-use") {
                showToast('error', 'Email already in use');
            } else if (err.code === "auth/invalid-email") {
                showToast('error', 'Invalid email format');
            } else if (err.code === "auth/weak-password") {
                showToast('error', 'Password should be at least 6 characters');
            } else {
                showToast('error', 'Something went wrong. Try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <LinearGradient
            colors={['#0D1B2A', '#1B3B5D']}
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <KeyboardAvoidingView
                        style={{ flex: 1 }}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                            <Text style={styles.title}>FitWear</Text>
                            <Text style={styles.subtitle}>Create your account</Text>

                            <View style={styles.inputWrapper}>
                                <TextInput
                                    placeholder="Full Name"
                                    placeholderTextColor="#ddd"
                                    value={name}
                                    onChangeText={setName}
                                    style={styles.input}
                                />
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor="#ddd"
                                    value={email}
                                    onChangeText={setEmail}
                                    style={styles.input}
                                />

                                {/* Password */}
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

                                {/* Confirm Password */}
                                <View style={styles.passwordContainer}>
                                    <TextInput
                                        placeholder="Confirm Password"
                                        placeholderTextColor="#ddd"
                                        value={confirmPassword}
                                        onChangeText={setConfirmPassword}
                                        secureTextEntry={!showConfirmPassword}
                                        style={[styles.input, { paddingRight: 50 }]}
                                    />
                                    <TouchableOpacity
                                        style={styles.eyeIcon}
                                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        <Ionicons
                                            name={showConfirmPassword ? "eye" : "eye-off"}
                                            size={24}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Signup Button */}
                            <TouchableOpacity
                                style={[styles.signupBtn, loading && { opacity: 0.7 }]}
                                onPress={handleSignup}
                                disabled={loading}
                            >
                                <Text style={styles.signupTextBtn}>
                                    {loading ? "Signing up..." : "Sign Up"}
                                </Text>
                            </TouchableOpacity>

                            {/* Footer */}
                            <TouchableOpacity style={styles.footer} onPress={() => router.push('/login')}>
                                <Text style={styles.footerText}>
                                    Already have an account? <Text style={styles.signupText}>Login</Text>
                                </Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
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
    signupBtn: {
        backgroundColor: "#00cfff",
        marginTop: 32,
        padding: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    signupTextBtn: {
        color: "#0D1B2A",
        fontSize: 18,
        fontWeight: "bold",
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
