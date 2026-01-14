import { CartItem } from "@/context/CartContext";
import { View } from "react-native";
import CartItemCard from "./CartItemCard";

interface CartItemListProps {
    items: CartItem[];
}

const CartItemList = ({ items }: CartItemListProps) => {
    return (
        <View>
            {items.map((item) => (
                <CartItemCard
                    key={item.id}
                    item={item}
                />
            ))}
        </View>
    );
};

export default CartItemList;