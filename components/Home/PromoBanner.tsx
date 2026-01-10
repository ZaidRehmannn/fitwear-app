import { colors } from "@/utils/theme";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PromoBanner = () => {
    return (
        <TouchableOpacity style={styles.promoBanner}>
            <LinearGradient
                colors={[colors.navyDark, colors.navy]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.promoGradient}
            >
                <View style={styles.promoContent}>
                    <Text style={styles.promoLabel}>LIMITED OFFER</Text>
                    <Text style={styles.promoTitle}>Get 20% Off</Text>
                    <Text style={styles.promoText}>On your first order</Text>
                </View>
                <View style={styles.promoCode}>
                    <Text style={styles.promoCodeText}>FIRST20</Text>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default PromoBanner;

const styles = StyleSheet.create({
    promoBanner: {
        marginHorizontal: 20,
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 24,
    },
    promoGradient: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 24,
    },
    promoContent: {
        flex: 1,
    },
    promoLabel: {
        fontSize: 10,
        fontWeight: "700",
        color: colors.cyan,
        letterSpacing: 1.5,
        marginBottom: 6,
    },
    promoTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: colors.white,
        marginBottom: 4,
    },
    promoText: {
        fontSize: 14,
        color: "rgba(255, 255, 255, 0.7)",
    },
    promoCode: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        borderStyle: "dashed",
    },
    promoCodeText: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.cyan,
        letterSpacing: 1,
    },
});