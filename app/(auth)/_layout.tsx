import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
    const { user, loading } = useAuth();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (user) {
        return <Redirect href="/(tabs)/home" />;
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}