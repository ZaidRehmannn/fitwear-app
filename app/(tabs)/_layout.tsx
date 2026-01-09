import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#999",
                tabBarStyle: {
                    backgroundColor: "#1B3B5D",
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 10,
                },
            }}
        >
            <Tabs.Screen
                name="home/index"
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={26}
                            color={focused ? "#fff" : color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="cart/index"
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons
                            name={focused ? "cart" : "cart-outline"}
                            size={26}
                            color={focused ? "#fff" : color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile/index"
                options={{
                    tabBarIcon: ({ focused, color }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            size={26}
                            color={focused ? "#fff" : color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="home/product/[id]"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}