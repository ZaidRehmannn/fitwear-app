import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Stack } from "expo-router";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CategoryProvider>
          <CartProvider>
            <Stack screenOptions={{ headerShown: false }} />
            <Toast />
          </CartProvider>
        </CategoryProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}