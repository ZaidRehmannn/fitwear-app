import { colors } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const FeaturesBanner = () => {
    return (
        <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
                <Ionicons name="car-outline" size={24} color={colors.cyan} />
                <Text style={styles.featureTitle}>Free Shipping</Text>
                <Text style={styles.featureText}>Orders over $100</Text>
            </View>
            <View style={styles.featureDivider} />
            <View style={styles.featureItem}>
                <Ionicons name="refresh-outline" size={24} color={colors.cyan} />
                <Text style={styles.featureTitle}>Easy Returns</Text>
                <Text style={styles.featureText}>30-day policy</Text>
            </View>
        </View>
    );
};

export default FeaturesBanner;

const styles = StyleSheet.create({
    featuresContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: colors.navy,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
        elevation: 2,
    },
    featureItem: {
        flex: 1,
        alignItems: "center",
        gap: 8,
    },
    featureDivider: {
        width: 1,
        backgroundColor: colors.border,
        marginHorizontal: 16,
    },
    featureTitle: {
        fontSize: 13,
        fontWeight: "700",
        color: colors.textPrimary,
    },
    featureText: {
        fontSize: 12,
        color: colors.textMuted,
    },
});