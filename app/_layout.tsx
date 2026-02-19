import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { CategoryProvider } from '@/context/CategoryContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { Stack } from "expo-router";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CategoryProvider>
          <CartProvider>
            <Stack screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'white' }
            }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="(app)" options={{ animation: 'slide_from_right' }} />
            </Stack>
            <Toast />
          </CartProvider>
        </CategoryProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}