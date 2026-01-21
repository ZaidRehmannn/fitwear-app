import MenuItemCard from "@/components/profile/MenuItemCard";
import { StyleSheet, View } from "react-native";

interface MenuItem {
    icon: string;
    label: string;
    route: string;
}

interface MenuListProps {
    items: MenuItem[];
    onItemPress: (route: string) => void;
}

const MenuList = ({ items, onItemPress }: MenuListProps) => {
    return (
        <View style={styles.menuContainer}>
            {items.map((item, index) => (
                <MenuItemCard
                    key={item.label}
                    icon={item.icon}
                    label={item.label}
                    onPress={() => onItemPress(item.route)}
                    isLast={index === items.length - 1}
                />
            ))}
        </View>
    );
};

export default MenuList;

const styles = StyleSheet.create({
    menuContainer: {
        marginTop: 24,
        marginHorizontal: 20,
        backgroundColor: "#f8fafc",
        borderRadius: 16,
        overflow: "hidden",
    },
});