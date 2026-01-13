import { colors } from "@/utils/theme";
import { StyleSheet, Text, View } from "react-native";

const Header = () => {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>FitWear</Text>
            <Text style={styles.subtitle}>Style that speaks for you</Text>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.navy,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: colors.textSecondary,
        marginTop: 2,
    },
});