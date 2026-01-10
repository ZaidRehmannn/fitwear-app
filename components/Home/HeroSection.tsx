import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface HeroSectionProps {
    onShopPress: () => void;
}

const HeroSection = ({ onShopPress }: HeroSectionProps) => {
    return (
        <LinearGradient
            colors={[colors.navy, colors.navyDark]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.hero}
        >
            <Text style={styles.heroLabel}>NEW COLLECTION 2026</Text>
            <Text style={styles.heroTitle}>
                Style That Speaks{"\n"}
                <Text style={styles.heroTitleAccent}>For You</Text>
            </Text>
            <Text style={styles.heroText}>
                Discover modern fashion crafted for every moment of your life.
            </Text>

            <TouchableOpacity style={styles.primaryButton} onPress={onShopPress}>
                <Text style={styles.primaryButtonText}>Shop Now</Text>
                <Ionicons name="arrow-forward" size={18} color={colors.navyDark} />
            </TouchableOpacity>
        </LinearGradient>
    );
};

export default HeroSection;

const styles = StyleSheet.create({
    hero: {
        marginHorizontal: 20,
        borderRadius: 24,
        padding: 28,
        marginBottom: 24,
    },
    heroLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: colors.cyan,
        letterSpacing: 2,
        marginBottom: 12,
    },
    heroTitle: {
        fontSize: 32,
        fontWeight: "800",
        color: colors.white,
        lineHeight: 40,
        marginBottom: 12,
    },
    heroTitleAccent: {
        color: colors.cyan,
    },
    heroText: {
        fontSize: 15,
        color: "rgba(255, 255, 255, 0.8)",
        lineHeight: 22,
        marginBottom: 24,
    },
    primaryButton: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: colors.cyan,
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        gap: 8,
        shadowColor: colors.cyan,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 5,
    },
    primaryButtonText: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.navyDark,
    },
});