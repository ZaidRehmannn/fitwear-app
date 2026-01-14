import { AuthProvider } from "@/context/AuthContext";
import { CategoryProvider } from "@/context/CategoryContext";
import { Stack } from "expo-router";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <AuthProvider>
      <CategoryProvider>
        <Stack screenOptions={{ headerShown: false }} />
        <Toast />
      </CategoryProvider>
    </AuthProvider>
  );
}