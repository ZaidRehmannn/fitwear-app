import AuthButton from '@/components/Auth/AuthButton';
import AuthFields, { Field } from '@/components/Auth/AuthFields';
import AuthFooter from '@/components/Auth/AuthFooter';
import AuthHeader from '@/components/Auth/AuthHeader';
import { loginUser } from '@/services/authService';
import { showToast } from '@/utils/toast';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView, Platform,
    TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const loginFields: Field[] = [
        { name: "email", placeholder: "Email", value: email, onChangeText: setEmail },
        { name: "password", placeholder: "Password", secure: true, value: password, onChangeText: setPassword },
    ];

    const resetForm = () => {
        setEmail("");
        setPassword("");
    };

    const handleLogin = async () => {
        if (!email || !password) {
            return showToast('error', 'Please fill in all fields');
        }

        try {
            setLoading(true);

            const userCredential = await loginUser(email, password);
            console.log("Logged in:", userCredential.user.email);
            resetForm();

            router.replace("/(tabs)/home");
        } catch (err: any) {
            console.log(err);

            if (err.code === "auth/invalid-credential") {
                showToast('error', 'Invalid email or password');
            } else if (err.code === "auth/invalid-email") {
                showToast('error', 'Invalid email format');
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
                        style={{ flex: 1, justifyContent: "center", padding: 24 }}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        {/* Header */}
                        <AuthHeader title='FitWear' subtitle='Welcome back' />

                        {/* Input Fields */}
                        <AuthFields fields={loginFields} />

                        {/* Button */}
                        <AuthButton
                            title={loading ? "Logging in..." : "Login"}
                            onPress={handleLogin}
                            loading={loading}
                        />

                        {/* Footer */}
                        <AuthFooter
                            text="Don't have an account?"
                            linkText="Sign Up"
                            onPress={() => router.push("/signup")}
                        />
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default login;
