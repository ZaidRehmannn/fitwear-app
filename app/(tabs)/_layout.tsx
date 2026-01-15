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
            }}
        >
            <Tabs.Screen
                name="home/index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? styles.activeIconContainer : undefined}>
                            <Ionicons
                                name={focused ? 'home' : 'home-outline'}
                                size={24}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="shop/index"
                options={{
                    title: 'Shop',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? styles.activeIconContainer : undefined}>
                            <Ionicons
                                name={focused ? 'grid' : 'grid-outline'}
                                size={24}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />

            <Tabs.Screen
                name="shop/product/[id]"
                options={{
                    href: null,
                }}
            />

            <Tabs.Screen
                name="cart/index"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color, focused }) => (
                        <View style={focused ? styles.activeIconContainer : undefined}>
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
                        <View style={focused ? styles.activeIconContainer : undefined}>
                            <Ionicons
                                name={focused ? 'person' : 'person-outline'}
                                size={24}
                                color={color}
                            />
                        </View>
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: tabColors.white,
        borderTopWidth: 0,
        height: Platform.OS === 'ios' ? 88 : 70,
        paddingTop: 8,
        paddingBottom: Platform.OS === 'ios' ? 28 : 12,
        shadowColor: tabColors.navy,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 20,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
    },
    tabBarLabel: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: 4,
    },
    tabBarItem: {
        paddingTop: 4,
    },
    activeIconContainer: {
        backgroundColor: 'rgba(0, 207, 255, 0.12)',
        borderRadius: 12,
        padding: 8,
        marginBottom: -4,
    },
    badge: {
        backgroundColor: tabColors.cyan,
        color: tabColors.navy,
        fontSize: 10,
        fontWeight: '700',
        minWidth: 18,
        height: 18,
        borderRadius: 9,
    },
});