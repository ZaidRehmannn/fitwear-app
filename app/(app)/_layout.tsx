import { Stack } from 'expo-router';

export default function AppLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="profile/address/index" />
            <Stack.Screen name="profile/wishlist/index" />
            <Stack.Screen name="shop/product/[id]" />
        </Stack>
    );
}