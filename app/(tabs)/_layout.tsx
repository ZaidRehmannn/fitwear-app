import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';
import { tabColors } from '@/utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';

export default function TabLayout() {
    const { user, loading } = useAuth();
    const { cartQuantity } = useCart();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user) {
        return <Redirect href="/login" />;
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: tabColors.cyan,
                tabBarInactiveTintColor: tabColors.gray,
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarItemStyle: styles.tabBarItem,
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tabs.Screen
                name="home/index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="shop/index"
                options={{
                    title: 'Shop',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'grid' : 'grid-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="cart/index"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color, focused }) => (
                        <View>
                            <Ionicons
                                name={focused ? 'cart' : 'cart-outline'}
                                size={24}
                                color={color}
                            />
                        </View>
                    ),
                    tabBarBadge: cartQuantity() > 0 ? cartQuantity() : undefined,
                    tabBarBadgeStyle: styles.badge,
                }}
            />

            <Tabs.Screen
                name="profile/index"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'person' : 'person-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: tabColors.white,
        position: 'absolute',
        left: 20,
        right: 20,
        bottom: Platform.OS === 'android' ? 50 : 30,
        height: 65,
        // borderRadius: Platform.OS === 'android' ? 0 : 30,
        // borderTopWidth: 0,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 5 },
        // shadowOpacity: 0.15,
        // shadowRadius: 10,
        elevation: 10,
        paddingBottom: 10,
        paddingTop: 10,
    },
    tabBarLabel: {
        fontSize: 10,
        fontWeight: '700',
        marginBottom: Platform.OS === 'android' ? 5 : 0,
    },
    tabBarItem: {
        paddingVertical: 5,
    },
    badge: {
        backgroundColor: tabColors.cyan,
        color: tabColors.white,
        fontSize: 10,
        fontWeight: 'bold',
        marginTop: -2,
    },
});