import AuthButton from '@/components/Auth/AuthButton';
import AuthFields, { Field } from '@/components/Auth/AuthFields';
import AuthFooter from '@/components/Auth/AuthFooter';
import AuthHeader from '@/components/Auth/AuthHeader';
import { signupUser } from '@/services/authService';
import { showToast } from '@/utils/toast';
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Keyboard,
    KeyboardAvoidingView, Platform,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
const signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const signupFields: Field[] = [
        { name: "name", placeholder: "Full Name", value: name, onChangeText: setName },
        { name: "email", placeholder: "Email", value: email, onChangeText: setEmail },
        { name: "password", placeholder: "Password", secure: true, value: password, onChangeText: setPassword },
        { name: "confirmPassword", placeholder: "Confirm Password", secure: true, value: confirmPassword, onChangeText: setConfirmPassword },
    ];

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
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
                        <ScrollView
                            contentContainerStyle={{ flex: 1, justifyContent: "center", padding: 24 }}
                            keyboardShouldPersistTaps="handled"
                        >
                            {/* Header */}
                            <AuthHeader title='FitWear' subtitle='Create your account' />

                            {/* Input Fields */}
                            <AuthFields fields={signupFields} />

                            {/* Button */}
                            <AuthButton
                                title={loading ? "Signing up..." : "Sign Up"}
                                onPress={handleSignup}
                                loading={loading}
                            />

                            {/* Footer */}
                            <AuthFooter
                                text="Already have an account?"
                                linkText="Login"
                                onPress={() => router.push("/login")}
                            />
                        </ScrollView>
                    </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </LinearGradient>
    )
}

export default signup;
